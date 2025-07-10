using Application.Extension;
using Application.Interfaces;
using Application.Mapper.Videos.Input;
using Application.Mapper.Videos.Output;
using KLN.Shared.CrossCuttingConcerns.Utils;
using CloudinaryDotNet;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Localization;
using Microsoft.Extensions.Localization;
using KLN.Shared.CrossCuttingConcerns;

namespace Application.Services
{
    public class VideoService(
        IVideoRepository _videoRepository,
        ILogVideoRepository _logVideoRepository,
        Cloudinary _cloudinary,
        YoutubeOperations _youtube,
        IUnitOfWork _unitOfWork,
        IStringLocalizer<KLNSharedResources> _localizer
        ) : IVideoService
    {
        public async Task<PaginationResponseDto<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var type = input.Type;
            var videos = await _videoRepository.GetAllVideosAsync(page, fetch, type);
            var totalVideo = await _videoRepository.CountVideoAsync(type);
            var videoMapper = GetVideoResponseMapper.GetVideoListMapEntityToDTO(videos);
            return new PaginationResponseDto<GetVideoResponse>(totalVideo, videoMapper);
        }

        public async Task<GetVideoResponse?> GetVideoByIdAsync(Guid id)
        {
            var video = await _videoRepository.GetVideoByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Video"]));
            return GetVideoResponseMapper.GetVideoMapEntityToDTO(video);
        }

        public async Task<GetTotalVideoResponse> GetTotalVideoAsync(GetTotalVideoRequest input)
        {
            var mediaType = input.Type;
            var count = await _videoRepository.CountVideoAsync(mediaType);
            return new GetTotalVideoResponse
            {
                TotalVideo = count,
            };
        }

        public async Task<GetVideoResponse> UpdateVideoAsync(Guid id, UpdateVideoRequest updateVideoRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var videoEntity = await _videoRepository.GetVideoByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Video"]));
                    await uow.TrackEntity(videoEntity);

                    // update Video
                    videoEntity.Title = updateVideoRequest.Title;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    // upload new image to cloudinary
                    if (updateVideoRequest.ImageFile != null)
                    {
                        // check file type
                        var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, };
                        var isAllowed = FileOperations.CheckFileType(allowedContentTypes, updateVideoRequest.ImageFile) == false
                            ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                        // add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, updateVideoRequest.ImageFile);

                        // upload to cloudinary
                        var assetFolder = CommonCloudinaryAttribute.assetFolderVideoImage;
                        var publicId = $"{nameof(Domain.Entities.Video)}_{id}";

                        var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var secure_url = resultUpload["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // delete file and folder from local
                        var isDeleted = FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        videoEntity.ImageLink = secure_url;
                    }
                    // upload new video to youtube
                    if (updateVideoRequest.VideoFile != null)
                    {
                        var allowedContentTypesVideo = new[] { "video/mp4", "video/avi" };
                        if (!FileOperations.CheckFileType(allowedContentTypesVideo, updateVideoRequest.VideoFile))
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], "video/mp4, video/avi"));

                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePathVideo = await FileOperations.SaveFileToLocal(folderPath, updateVideoRequest.VideoFile);

                        // Upload video
                        string newVideoLink = await _youtube.UploadVideoToYouTube(filePathVideo, updateVideoRequest.Title);
                        videoEntity.VideoLink = newVideoLink;
                        FileOperations.DeleteFileFromLocal(filePathVideo, folderPath);
                    }

                    // update log Video
                    var newLogVideo = new LogVideo
                    {
                        LogVideoId = 0,
                        Title = videoEntity.Title,
                        ImageLink = videoEntity.ImageLink,
                        CreateDate = videoEntity.CreateDate,
                        UserId = videoEntity.UserId,
                        VideoLink = videoEntity.VideoLink,
                        VideoId = videoEntity.VideoId,
                        Process = ProcessMethod.UPDATE,
                    };
                    await _logVideoRepository.CreateLogVideoAsync(newLogVideo);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetVideoResponseMapper.GetVideoMapEntityToDTO(videoEntity);

                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["UpdateVideoFailed"]);
                }
            }
        }

        public async Task<GetVideoResponse> CreateVideoAsync(AddVideoRequest addVideoRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    Guid newGuid = Guid.NewGuid();
                    var assetFolderImage = CommonCloudinaryAttribute.assetFolderVideoImage;
                    var publicId = $"{nameof(Domain.Entities.Video)}_{newGuid}";
                    var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG };

                    // upload Image
                    // check file type
                    var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, addVideoRequest.ImageFile) == false ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                    // add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePathImage = await FileOperations.SaveFileToLocal(folderPath, addVideoRequest.ImageFile);

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                    var imageLink = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                    // delete file and folder from local
                    var isDeletedImage = FileOperations.DeleteFileFromLocal(filePathImage, folderPath);

                    // --- Upload Video to YouTube ---
                    // Check file type video
                    var allowedContentTypesVideo = new[] { "video/mp4", "video/avi" }; // Add other type if needed
                    var isAllowedVideo = FileOperations.CheckFileType(allowedContentTypesVideo, addVideoRequest.VideoFile) == false
                        ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], "video/mp4, video/avi"))
                        : true;

                    // Add file to local
                    var filePathVideo = await FileOperations.SaveFileToLocal(folderPath, addVideoRequest.VideoFile);

                    // Upload to YouTube
                    string videoLink = await _youtube.UploadVideoToYouTube(filePathVideo, addVideoRequest.Title);

                    // Delete file and folder from local
                    var isDeletedVideo = FileOperations.DeleteFileFromLocal(filePathVideo, folderPath);

                    // map from DTO to entity
                    var addVideoMapperDTOToEntity = AddVideoRequestMapper.AddVideoMapDTOToEntity(addVideoRequest, videoLink, imageLink, newGuid);
                    await uow.TrackEntity(addVideoMapperDTOToEntity);
                    await _videoRepository.CreateVideoAsync(addVideoMapperDTOToEntity);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    var addedVideo = await _videoRepository.GetVideoByIdAsync(newGuid) ?? throw new InvalidOperationException(_localizer["AddVideoFailed"]);
                    return GetVideoResponseMapper.GetVideoMapEntityToDTO(addedVideo);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["AddVideoFailed"]);
                }
            }
        }

        public async Task<bool> DeleteVideoAsync(Guid id)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var videoEntity = await _videoRepository.GetVideoByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Video"]));
                    // update log Video
                    var newLogVideo = new LogVideo
                    {
                        LogVideoId = 0,
                        Title = videoEntity.Title,
                        ImageLink = videoEntity.ImageLink,
                        CreateDate = videoEntity.CreateDate,
                        UserId = videoEntity.UserId,
                        VideoLink = videoEntity.VideoLink,
                        VideoId = videoEntity.VideoId,
                        Process = ProcessMethod.DELETE,
                    };
                    await _logVideoRepository.CreateLogVideoAsync(newLogVideo);

                    // delete image from cloudinary
                    //var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    //var publicId = $"{nameof(Domain.Entities.Video)}_{id}";
                    //var result = cloudinaryOperations.DeleteFileFromCloudinary(publicId);

                    // delete Video
                    var video = new Domain.Entities.Video { VideoId = id };
                    await uow.TrackEntity(video);

                    await _videoRepository.SoftDeleteVideoAsync(video);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    return true;
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["DeleteVideoFailed"]);
                }
            }
        }

        public async Task<bool> DeleteMultipleVideoAsync(List<Guid> ids)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Fetch all music entities once for logging
                    Console.WriteLine($"ids: {ids}");
                    var videoEntities = await _videoRepository.GetVideoByIdsAsync(ids);
                    Console.WriteLine($"Fetched {videoEntities?.Count() ?? 0} video records for deletion.");
                    if (videoEntities == null || !videoEntities.Any())
                    {
                        throw new KeyNotFoundException(_localizer["NoVideoRecordsFound"]);
                    }

                    // Create deletion log entries
                    var logEntries = videoEntities.Select(video => new LogVideo
                    {
                        LogVideoId = 0,
                        Title = video.Title,
                        ImageLink = video.ImageLink,
                        CreateDate = video.CreateDate,
                        UserId = video.UserId,
                        VideoLink = video.VideoLink,
                        VideoId = video.VideoId,
                        Process = ProcessMethod.DELETE,
                    }).ToList();

                    await _logVideoRepository.CreateLogVideoRangeAsync(logEntries);

                    // Perform soft deletion directly in repository by IDs
                    await _videoRepository.SoftDeleteMultipleVideoByIdsAsync(ids);

                    // Save and commit
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Delete multiple video error: {ex.Message}");
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["DeleteVideoFailed"]);
                }
            }
        }
    }
}
