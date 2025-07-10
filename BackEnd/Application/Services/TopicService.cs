using Application.Interfaces;
using Application.Mapper.Topics.Output;
using Domain;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns;
using Application.Mapper.Topics.Input;
using Domain.Entities;
using KLN.Shared.CrossCuttingConcerns.Utils;
using System.Text.Json;

namespace Application.Services
{
    public class TopicService(
        ITopicRepository _topicRepository,
        ILogTopicRepository _logTopicRepository,
        IConfiguration _configuration,
        IUnitOfWork _unitOfWork,
        Cloudinary _cloudinary,
        YoutubeOperations _youtube,
        IStringLocalizer<KLNSharedResources> _localizer
        ) : ITopicService
    {
        public async Task<PaginationResponseDto<GetTopicResponse>> GetAllTopicsAsync(GetAllTopicRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var type = input.Type;
            var topicType = input.TopicType;
            var topics = await _topicRepository.GetAllTopicsAsync(page, fetch, type, topicType);
            var totalTopic = await _topicRepository.CountTopicAsync(type, topicType);
            var topicMapper = GetTopicResponseMapper.GetTopicListMapEntityToDTO(topics);
            return new PaginationResponseDto<GetTopicResponse>(totalTopic, topicMapper);
        }

        public async Task<GetTopicResponse?> GetTopicByIdAsync(Guid id)
        {
            var topic = await _topicRepository.GetTopicByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Topic"]));

            return GetTopicResponseMapper.GetTopicMapEntityToDTO(topic);
        }

        public async Task<GetTopicResponse> CreateTopicAsync(AddTopicRequest addTopicRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG, CommonFileType.JPG };
                var allowedContentTypesVideo = new[] { CommonFileType.MP4, CommonFileType.AVI, CommonFileType.MOV, CommonFileType.WMV, CommonFileType.FLV, CommonFileType.MKV, CommonFileType.WEBM, CommonFileType.MPEG };
                int totalImageCount = addTopicRequest.TopicMedia.Count(m =>
                        FileOperations.CheckFileType(allowedContentTypesImage, m.MediaLink));

                int totalVideoCount = addTopicRequest.TopicMedia.Count(m =>
                    FileOperations.CheckFileType(allowedContentTypesVideo, m.MediaLink));

                if (totalImageCount > 3 || totalVideoCount > 3)
                {
                    throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["MaxItems"], _localizer["TopicMedia"]));
                }

                try
                {
                    Guid newGuid = Guid.NewGuid();
                    var asssetFolderTopicImage = CommonCloudinaryAttribute.assetFolderTopicImage;
                    var assetFolderTopicVideo = CommonCloudinaryAttribute.assetFolderTopicVideo;
                    var publicId = $"{nameof(Topic)}_{newGuid}";
            
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    List<(string ImageUrl, string Capture)> topicImagesList = new List<(string, string)>();
                    List<(string ImageUrl, string Capture)> topicVideosList = new List<(string, string)>();
                    foreach (var topicMediaRequest in addTopicRequest.TopicMedia)
                    {
                        // check meida type
                        if (FileOperations.CheckFileType(allowedContentTypesImage, topicMediaRequest.MediaLink) == true)
                        {
                            // add file to local
                            var topicFilePath = await FileOperations.SaveFileToLocal(folderPath, topicMediaRequest.MediaLink);
                            var topicPublicId = $"{publicId}_img_{Guid.NewGuid()}";

                            // upload topic image to Cloudinary
                            var resultTopicImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(topicFilePath, asssetFolderTopicImage, topicPublicId)
                            ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                            var topicImageUrl = resultTopicImage["secure_url"]?.ToString()
                                ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));
                            topicImagesList.Add((topicImageUrl, topicMediaRequest.Capture));
                            // Delete the local file after upload
                            FileOperations.DeleteFileFromLocal(topicFilePath, folderPath);
                        }
                        else if (FileOperations.CheckFileType(allowedContentTypesVideo, topicMediaRequest.MediaLink) == true)
                        {
                            // add file to local
                            var filePathVideo = await FileOperations.SaveFileToLocal(folderPath, topicMediaRequest.MediaLink);
                            var topicPublicId = $"{publicId}_vid_{Guid.NewGuid()}";

                            // upload topic video to Youtube
                            string videoLink = await _youtube.UploadVideoToYouTube(filePathVideo, topicMediaRequest.Capture);

                            // Delete file and folder from local
                            var isDeletedVideo = FileOperations.DeleteFileFromLocal(filePathVideo, folderPath);

                            topicVideosList.Add((videoLink, topicMediaRequest.Capture));

                            // Delete the local file after upload
                            FileOperations.DeleteFileFromLocal(filePathVideo, folderPath);
                        }
                        else
                        {
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}, {CommonFileType.JPG}, {string.Join(", ", allowedContentTypesVideo)}"));
                        }
                    }

                    var topicEntity = AddTopicRequestMapper.AddTopicMapDTOToEntity(addTopicRequest, topicImagesList, topicVideosList, newGuid);
                    await uow.TrackEntity(topicEntity);
                    await _topicRepository.CreateTopicAsync(topicEntity);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    var addedTopic = await _topicRepository.GetTopicByIdAsync(newGuid)
                                     ?? throw new InvalidOperationException(_localizer["CreateTopicFailed"]);
                    return GetTopicResponseMapper.GetTopicMapEntityToDTO(addedTopic);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["AddTopicFailed"]);
                }
            }
        }

        public async Task<GetTopicResponse> UpdateTopicAsync(Guid id, UpdateTopicRequest updateTopicRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG, CommonFileType.JPG };
                var allowedContentTypesVideo = new[] { CommonFileType.MP4, CommonFileType.AVI, CommonFileType.MOV, CommonFileType.WMV, CommonFileType.FLV, CommonFileType.MKV, CommonFileType.WEBM, CommonFileType.MPEG };
                int totalImageCount = updateTopicRequest.TopicMedia.Count(m =>
                        FileOperations.CheckFileType(allowedContentTypesImage, m.MediaLink));

                int totalVideoCount = updateTopicRequest.TopicMedia.Count(m =>
                    FileOperations.CheckFileType(allowedContentTypesVideo, m.MediaLink));

                if (totalImageCount > 3 || totalVideoCount > 3)
                {
                    throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["MaxItems"], _localizer["TopicMedia"]));
                }

                try
                {
                    var topicEntity = await _topicRepository.GetTopicByIdAsync(id)
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Topic"]));

                    await uow.TrackEntity(topicEntity);

                    topicEntity.Capture = updateTopicRequest.Capture;
                    topicEntity.Description = updateTopicRequest.Description;

                    var asssetFolderTopicImage = CommonCloudinaryAttribute.assetFolderTopicImage;
                    var assetFolderTopicVideo = CommonCloudinaryAttribute.assetFolderTopicVideo;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");

                    List<(string ImageUrl, string Capture)> topicImagesList = new List<(string, string)>();
                    List<(string ImageUrl, string Capture)> topicVideosList = new List<(string, string)>();

                    if (updateTopicRequest.TopicMedia != null && updateTopicRequest.TopicMedia.Any())
                    {
                        foreach (var topicMediaRequest in updateTopicRequest.TopicMedia)
                        {
                            // check meida type
                            if (FileOperations.CheckFileType(allowedContentTypesImage, topicMediaRequest.MediaLink) == true)
                            {
                                // add file to local
                                var topicFilePath = await FileOperations.SaveFileToLocal(folderPath, topicMediaRequest.MediaLink);
                                var topicPublicId = $"{nameof(Domain.Entities.Topic)}_{id}_img_{Guid.NewGuid()}";

                                // upload topic image to Cloudinary
                                var resultTopicImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(topicFilePath, asssetFolderTopicImage, topicPublicId)
                                ?? throw new InvalidOperationException(_localizer["UpdateImageCloudinaryFailed"]);

                                var topicImageUrl = resultTopicImage["secure_url"]?.ToString()
                                    ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));
                                topicImagesList.Add((topicImageUrl, topicMediaRequest.Capture));

                                // Delete the local file after upload
                                FileOperations.DeleteFileFromLocal(topicFilePath, folderPath);
                            }
                            else if (FileOperations.CheckFileType(allowedContentTypesVideo, topicMediaRequest.MediaLink) == true)
                            {
                                // add file to local
                                var filePathVideo = await FileOperations.SaveFileToLocal(folderPath, topicMediaRequest.MediaLink);
                                var topicPublicId = $"{nameof(Domain.Entities.Topic)}_{id}_vid_{Guid.NewGuid()}";

                                // upload topic video to Youtube
                                string videoLink = await _youtube.UploadVideoToYouTube(filePathVideo, topicMediaRequest.Capture);

                                // Delete file and folder from local
                                var isDeletedVideo = FileOperations.DeleteFileFromLocal(filePathVideo, folderPath);

                                topicVideosList.Add((videoLink, topicMediaRequest.Capture));

                                // Delete the local file after upload
                                FileOperations.DeleteFileFromLocal(filePathVideo, folderPath);
                            }
                            else
                            {
                                throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}, {CommonFileType.JPG}, {string.Join(", ", allowedContentTypesVideo)}"));
                            }
                        }
                    }


                    topicEntity.Images = JsonSerializer.Serialize(
                            topicImagesList.Select((img, index) => new GetTopicImagesResponse
                            {
                                Id = index + 1,
                                Capture = img.Capture,
                                ImageLink = img.ImageUrl
                            })
                         );

                    topicEntity.Videos = JsonSerializer.Serialize(
                        topicVideosList.Select((vid, index) => new GetTopicVideoLinkResponse
                        {
                            Id = index + 1,
                            Capture = vid.Capture,
                            VideoLink = vid.ImageUrl
                        })
                     );

                    topicEntity.LogTopics ??= new List<LogTopic>();
                    topicEntity.LogTopics.Add(new LogTopic
                    {
                        LogTopicId = 0,
                        Capture = topicEntity.Capture,
                        Description = topicEntity.Description,
                        MediaTypeId = topicEntity.MediaTypeId,
                        CreateDate = topicEntity.CreateDate,
                        Images = topicEntity.Images,
                        Videos = topicEntity.Videos,
                        UserId = topicEntity.UserId,
                        Process = ProcessMethod.UPDATE,
                    });


                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetTopicResponseMapper.GetTopicMapEntityToDTO(topicEntity);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["UpdateTopicFailed"]);
                }
            }
        }

        public async Task<bool> DeleteMultipleTopicAsync(List<Guid> ids)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Fetch all music entities once for logging
                    Console.WriteLine($"ids: {ids}");
                    var topicEntities = await _topicRepository.GetTopicByIdsAsync(ids);
                    Console.WriteLine($"Fetched {topicEntities?.Count() ?? 0} topic records for deletion.");
                    if (topicEntities == null || !topicEntities.Any())
                    {
                        throw new KeyNotFoundException(_localizer["NoTopicRecordsFound"]);
                    }

                    var logEntries = topicEntities.Select(topic => new LogTopic
                    {
                        LogTopicId = 0,
                        Capture = topic.Capture,
                        Description = topic.Description,
                        MediaTypeId = topic.MediaTypeId,
                        CreateDate = topic.CreateDate,
                        Images = topic.Images,
                        Videos = topic.Videos,
                        UserId = topic.UserId,
                        Process = ProcessMethod.DELETE,
                    }).ToList();

                    await _logTopicRepository.CreateLogTopicRangeAsync(logEntries);

                    await _topicRepository.SoftDeleteMultipleTopicByIdsAsync(ids);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return true;
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["DeleteTopicFailed"]);
                }
            }
        }
    }
}
