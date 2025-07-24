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
using System.Security.Cryptography.X509Certificates;
using CloudinaryDotNet.Actions;

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
                // Check for duplicate title
                var existingTopic = await _topicRepository.GetTopicByTitleAsync(addTopicRequest.Capture);
                if (existingTopic != null)
                {
                    throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["TopicCapture"]));
                }

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
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetTopicResponse> UpdateTopicAsync(Guid id, UpdateTopicRequest updateTopicRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                // Check for duplicate title (ignore current topic's title)
                var existingTopic = await _topicRepository.GetTopicByTitleAsync(updateTopicRequest.Capture);
                if (existingTopic != null && existingTopic.TopicId != id)
                {
                    throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["TopicCapture"]));
                }

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
                    throw new InvalidOperationException(ex.Message);
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
                    var topicEntities = await _topicRepository.GetTopicByIdsAsync(ids);
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
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetTopicMediaResponse> AddTopicMediaAsync(AddTopicMediaRequest addTopicMediaRequest)
        {
            var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG, CommonFileType.JPG };
            var allowedContentTypesVideo = new[] { CommonFileType.MP4, CommonFileType.AVI, CommonFileType.MOV, CommonFileType.WMV, CommonFileType.FLV, CommonFileType.MKV, CommonFileType.WEBM, CommonFileType.MPEG };
            int totalImageCount = addTopicMediaRequest.TopicImages.Count(m =>
                    FileOperations.CheckFileType(allowedContentTypesImage, m.ImageLink));

            int totalVideoCount = addTopicMediaRequest.TopicVideos.Count(m =>
                FileOperations.CheckFileType(allowedContentTypesVideo, m.VideoLink));

            if (totalImageCount > 3 || totalVideoCount > 3)
            {
                throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["MaxItems"], _localizer["TopicMedia"]));
            }
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var id = addTopicMediaRequest.TopicId ?? throw new ArgumentNullException(CommonExtensions.GetValidateMessage(_localizer["InvalidValue"], _localizer["TopicId"]));
                    var topicEntity = await _topicRepository.GetTopicByIdAsync(id)
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Topic"]));

                    await uow.TrackEntity(topicEntity);
                    var asssetFolderTopicImage = CommonCloudinaryAttribute.assetFolderTopicImage;
                    var assetFolderTopicVideo = CommonCloudinaryAttribute.assetFolderTopicVideo;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");

                    List<(string ImageUrl, string Capture)> topicImagesList = new List<(string, string)>();
                    List<(string ImageUrl, string Capture)> topicVideosList = new List<(string, string)>();

                    // Track the entity for adding to existing topic
                    await uow.TrackEntity(topicEntity);

                    // Deserialize the SlideImage JSON field
                    var currentImages = string.IsNullOrWhiteSpace(topicEntity.Images)
                        ? new List<GetTopicImagesResponse>()
                        : JsonSerializer.Deserialize<List<GetTopicImagesResponse>>(topicEntity.Images!)!;

                    var currentVideos = string.IsNullOrWhiteSpace(topicEntity.Videos)
                        ? new List<GetTopicVideoLinkResponse>()
                        : JsonSerializer.Deserialize<List<GetTopicVideoLinkResponse>>(topicEntity.Videos!)!;

                    int imageIndex = currentImages.Count;
                    int videoIndex = currentVideos.Count;

                    // Upload new images
                    foreach (var topicImage in addTopicMediaRequest.TopicImages)
                    {
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, topicImage.ImageLink);
                        var publicId = $"{nameof(Domain.Entities.Topic)}_{id}_img_{Guid.NewGuid()}";

                        var result = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, asssetFolderTopicImage, publicId)
                            ?? throw new InvalidOperationException(_localizer["UpdateImageCloudinaryFailed"]);

                        var imageUrl = result["secure_url"]?.ToString()
                            ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        currentImages.Add(new GetTopicImagesResponse
                        {
                            Id = ++imageIndex,
                            Capture = topicImage.Capture,
                            ImageLink = imageUrl
                        });

                        FileOperations.DeleteFileFromLocal(filePath, folderPath);
                    }

                    // Upload new videos
                    foreach (var topicVideo in addTopicMediaRequest.TopicVideos)
                    {
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, topicVideo.VideoLink);
                        var publicId = $"{nameof(Domain.Entities.Topic)}_{id}_vid_{Guid.NewGuid()}";

                        var videoUrl = await _youtube.UploadVideoToYouTube(filePath, topicVideo.Capture);
                        FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        currentVideos.Add(new GetTopicVideoLinkResponse
                        {
                            Id = ++videoIndex,
                            Capture = topicVideo.Capture,
                            VideoLink = videoUrl
                        });
                    }

                    // Update topicEntity
                    topicEntity.Images = JsonSerializer.Serialize(currentImages);
                    topicEntity.Videos = JsonSerializer.Serialize(currentVideos);

                    // Optional: Add log
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
                        Process = ProcessMethod.UPDATE
                    });

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return new GetTopicMediaResponse
                    {
                        Images = currentImages,
                        Videos = currentVideos
                    };
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }
        public async Task<GetTopicMediaResponse> UpdateTopicMediaAsync(UpdateTopicMediaRequest updateTopicMediaRequest)
        {
            var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG, CommonFileType.JPG };
            var allowedContentTypesVideo = new[] { CommonFileType.MP4, CommonFileType.AVI, CommonFileType.MOV, CommonFileType.WMV, CommonFileType.FLV, CommonFileType.MKV, CommonFileType.WEBM, CommonFileType.MPEG };
            int totalImageCount = updateTopicMediaRequest.TopicImages.Count(m =>
                    FileOperations.CheckFileType(allowedContentTypesImage, m.ImageLink));

            int totalVideoCount = updateTopicMediaRequest.TopicVideos.Count(m =>
                FileOperations.CheckFileType(allowedContentTypesVideo, m.VideoLink));

            if (totalImageCount > 3 || totalVideoCount > 3)
            {
                throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["MaxItems"], _localizer["TopicMedia"]));
            }

            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var id = updateTopicMediaRequest.TopicId ?? throw new ArgumentNullException(CommonExtensions.GetValidateMessage(_localizer["InvalidValue"], _localizer["TopicId"]));
                    var topicEntity = await _topicRepository.GetTopicByIdAsync(id)
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Topic"]));

                    await uow.TrackEntity(topicEntity);
                    var asssetFolderTopicImage = CommonCloudinaryAttribute.assetFolderTopicImage;
                    var assetFolderTopicVideo = CommonCloudinaryAttribute.assetFolderTopicVideo;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");

                    List<(string ImageUrl, string Capture)> topicImagesList = new List<(string, string)>();
                    List<(string ImageUrl, string Capture)> topicVideosList = new List<(string, string)>();

                    // Track the entity for adding to existing topic
                    await uow.TrackEntity(topicEntity);

                    // Deserialize the SlideImage JSON field
                    var currentImages = string.IsNullOrWhiteSpace(topicEntity.Images)
                        ? new List<GetTopicImagesResponse>()
                        : JsonSerializer.Deserialize<List<GetTopicImagesResponse>>(topicEntity.Images!)!;

                    var currentVideos = string.IsNullOrWhiteSpace(topicEntity.Videos)
                        ? new List<GetTopicVideoLinkResponse>()
                        : JsonSerializer.Deserialize<List<GetTopicVideoLinkResponse>>(topicEntity.Videos!)!;

                    // Update existing images 
                    for (int i = 0; i < updateTopicMediaRequest.ImageIds.Count; i++)
                    {
                        var imageId = updateTopicMediaRequest.ImageIds[i];
                        var updatedImage = updateTopicMediaRequest.TopicImages[i];

                        var existingImage = currentImages.FirstOrDefault(img => img.Id == imageId)
                            ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], $"ImageId {imageId}"));

                        // Upload and replace
                        if (FileOperations.CheckFileType(allowedContentTypesImage, updatedImage.ImageLink))
                        {
                            var filePath = await FileOperations.SaveFileToLocal(folderPath, updatedImage.ImageLink);
                            var publicId = $"{nameof(Domain.Entities.Topic)}_{id}_img_{Guid.NewGuid()}";

                            var uploadResult = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, asssetFolderTopicImage, publicId)
                                ?? throw new InvalidOperationException(_localizer["UpdateImageCloudinaryFailed"]);

                            var secureUrl = uploadResult["secure_url"]?.ToString()
                                ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                            //var oldPublicId = cloudinaryOperations.ExtractPublicIdFromUrl(existingImage.ImageLink);
                            //cloudinaryOperations.DeleteFileFromCloudinary(oldPublicId);

                            FileOperations.DeleteFileFromLocal(filePath, folderPath);
                            existingImage.ImageLink = secureUrl;
                        }

                        if (!string.IsNullOrWhiteSpace(updatedImage.Capture))
                        {
                            existingImage.Capture = updatedImage.Capture;
                        }
                    }

                    // Add new images here
                    for (int i = updateTopicMediaRequest.ImageIds.Count; i < updateTopicMediaRequest.TopicImages.Count; i++)
                    {
                        var newImage = updateTopicMediaRequest.TopicImages[i];

                        if (FileOperations.CheckFileType(allowedContentTypesImage, newImage.ImageLink))
                        {
                            var filePath = await FileOperations.SaveFileToLocal(folderPath, newImage.ImageLink);
                            var publicId = $"{nameof(Domain.Entities.Topic)}_{id}_img_{Guid.NewGuid()}";

                            var uploadResult = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, asssetFolderTopicImage, publicId)
                                ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);

                            var secureUrl = uploadResult["secure_url"]?.ToString()
                                ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                            FileOperations.DeleteFileFromLocal(filePath, folderPath);

                            currentImages.Add(new GetTopicImagesResponse
                            {
                                Id = currentImages.Count + 1,
                                Capture = newImage.Capture,
                                ImageLink = secureUrl
                            });
                        }
                    }

                    // Update existing videos
                    for (int i = 0; i < updateTopicMediaRequest.VideoIds.Count; i++)
                    {
                        var videoId = updateTopicMediaRequest.VideoIds[i];
                        var updatedVideo = updateTopicMediaRequest.TopicVideos[i];

                        var existingVideo = currentVideos.FirstOrDefault(vid => vid.Id == videoId)
                            ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], $"VideoId {videoId}"));

                        // Upload video if a new file is provided
                        if (FileOperations.CheckFileType(allowedContentTypesVideo, updatedVideo.VideoLink))
                        {
                            var filePath = await FileOperations.SaveFileToLocal(folderPath, updatedVideo.VideoLink);

                            var videoUrl = await _youtube.UploadVideoToYouTube(filePath, updatedVideo.Capture);

                            FileOperations.DeleteFileFromLocal(filePath, folderPath);

                            existingVideo.VideoLink = videoUrl;
                        }

                        if (!string.IsNullOrWhiteSpace(updatedVideo.Capture))
                        {
                            existingVideo.Capture = updatedVideo.Capture;
                        }
                    }

                    // Add new videos here
                    for (int i = updateTopicMediaRequest.VideoIds.Count; i < updateTopicMediaRequest.TopicVideos.Count; i++)
                    {
                        var newVideo = updateTopicMediaRequest.TopicVideos[i];

                        if (FileOperations.CheckFileType(allowedContentTypesVideo, newVideo.VideoLink))
                        {
                            var filePath = await FileOperations.SaveFileToLocal(folderPath, newVideo.VideoLink);

                            var videoUrl = await _youtube.UploadVideoToYouTube(filePath, newVideo.Capture);

                            FileOperations.DeleteFileFromLocal(filePath, folderPath);

                            currentVideos.Add(new GetTopicVideoLinkResponse
                            {
                                Id = currentVideos.Count + 1,
                                Capture = newVideo.Capture,
                                VideoLink = videoUrl
                            });
                        }
                    }

                    // Serialize back to entity
                    topicEntity.Images = JsonSerializer.Serialize(currentImages);
                    topicEntity.Videos = JsonSerializer.Serialize(currentVideos);

                    // log topic
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
                        Process = ProcessMethod.UPDATE
                    });

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return new GetTopicMediaResponse
                    {
                        Images = currentImages,
                        Videos = currentVideos
                    };
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetTopicMediaResponse> DeleteTopicMediaAsync(DeleteTopicMediaRequest request)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var topicEntity = await _topicRepository.GetTopicByIdAsync(request.TopicId)
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Topic"]));

                    await uow.TrackEntity(topicEntity);

                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    var currentImages = string.IsNullOrWhiteSpace(topicEntity.Images)
                        ? new List<GetTopicImagesResponse>()
                        : JsonSerializer.Deserialize<List<GetTopicImagesResponse>>(topicEntity.Images!)!;

                    var currentVideos = string.IsNullOrWhiteSpace(topicEntity.Videos)
                        ? new List<GetTopicVideoLinkResponse>()
                        : JsonSerializer.Deserialize<List<GetTopicVideoLinkResponse>>(topicEntity.Videos!)!;

                    // Delete images
                    if (request.ImageIds?.Count > 0)
                    {
                        foreach (var imageId in request.ImageIds)
                        {
                            var image = currentImages.FirstOrDefault(img => img.Id == imageId);
                            if (image != null)
                            {
                                currentImages.Remove(image);
                            }
                        }

                        // Reassign image IDs
                        for (int i = 0; i < currentImages.Count; i++)
                        {
                            currentImages[i].Id = i + 1;
                        }
                    }

                    // Delete videos
                    if (request.VideoIds?.Count > 0)
                    {
                        foreach (var videoId in request.VideoIds)
                        {
                            var video = currentVideos.FirstOrDefault(v => v.Id == videoId);
                            if (video != null)
                            {
                                currentVideos.Remove(video);
                            }
                        }

                        // Reassign video IDs
                        for (int i = 0; i < currentVideos.Count; i++)
                        {
                            currentVideos[i].Id = i + 1;
                        }
                    }

                    // Serialize updated lists
                    topicEntity.Images = JsonSerializer.Serialize(currentImages);
                    topicEntity.Videos = JsonSerializer.Serialize(currentVideos);

                    // Log deletion
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
                        UserId = request.UserId,
                        Process = ProcessMethod.DELETE
                    });

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return new GetTopicMediaResponse
                    {
                        Images = currentImages,
                        Videos = currentVideos
                    };
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }
    }
}
