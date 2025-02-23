using Application.Extension;
using Application.Interfaces;
using Application.Mapper.Videos.Input;
using Application.Mapper.Videos.Output;
using Application.Utils;
using CloudinaryDotNet;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Localization;
using Microsoft.Extensions.Localization;

namespace Application.Services
{
    public class VideoService : IVideoService
    {
        #region Fields
        private readonly IVideoRepository _videoRepository;
        private readonly ILogVideoRepository _logVideoRepository;
        private readonly Cloudinary _cloudinary;
        private readonly IUnitOfWork _unitOfWork;
        IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public VideoService(
            IVideoRepository videoRepository,
            IUnitOfWork unitOfWork,
            ILogVideoRepository logVideoRepository,
            Cloudinary cloudinary,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _videoRepository = videoRepository;
            _unitOfWork = unitOfWork;
            _logVideoRepository = logVideoRepository;
            _cloudinary = cloudinary;
            _localizer = localizer;
        }
        #endregion

        public async Task<IEnumerable<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var videos = await _videoRepository.GetAllVideosAsync(page, fetch);
            return GetVideoResponseMapper.GetVideoListMapEntityToDTO(videos);
        }

        public async Task<GetVideoResponse> GetVideoByIdAsync(Guid id)
        {
            var video = await _videoRepository.GetVideoByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Video"]));
            return GetVideoResponseMapper.GetVideoMapEntityToDTO(video);
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
                    videoEntity.VideoLink = updateVideoRequest.VideoLink;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    // upload new image to cloudinary
                    if (updateVideoRequest.ImageLink != null)
                    {
                        // check file type
                        var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, };
                        var isAllowed = FileOperations.CheckFileType(allowedContentTypes, updateVideoRequest.ImageLink) == false
                            ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                        // add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, updateVideoRequest.ImageLink);

                        // upload to cloudinary
                        var assetFolder = CommonCloudinaryAttribute.assetFolderVideoImage;
                        var publicId = $"{nameof(Video)}_{id}";

                        var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var secure_url = resultUpload["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // delete file and folder from local
                        var isDeleted = FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        videoEntity.ImageLink = secure_url;
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
                        Process = "UPDATE",
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
                    var publicId = $"{nameof(Video)}_{newGuid}";
                    var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG };

                    // upload Image
                    // check file type
                    var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, addVideoRequest.ImageLink) == false ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                    // add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePathImage = await FileOperations.SaveFileToLocal(folderPath, addVideoRequest.ImageLink);

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                    var imageLink = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                    // delete file and folder from local
                    var isDeletedImage = FileOperations.DeleteFileFromLocal(filePathImage, folderPath);

                    // map from DTO to entity
                    var addVideoMapperDTOToEntity = AddVideoRequestMapper.AddVideoMapDTOToEntity(addVideoRequest, imageLink, newGuid);
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
                        Process = "DELETE",
                    };
                    await _logVideoRepository.CreateLogVideoAsync(newLogVideo);

                    // delete image from cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var publicId = $"{nameof(Video)}_{id}";
                    var result = cloudinaryOperations.DeleteFileFromCloudinary(publicId);

                    // delete Video
                    var video = new Video { VideoId = id };
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
    }
}
