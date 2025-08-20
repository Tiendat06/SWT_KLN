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

                List<(string ImageUrl, string Capture)> topicImagesList = new List<(string, string)>();
                List<(string ImageUrl, string Capture)> topicVideosList = new List<(string, string)>();

                try
                {
                    var topicEntity = await _topicRepository.GetTopicByIdAsync(id)
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Topic"]));

                    await uow.TrackEntity(topicEntity);

                    var asssetFolderTopicImage = CommonCloudinaryAttribute.assetFolderTopicImage;
                    var assetFolderTopicVideo = CommonCloudinaryAttribute.assetFolderTopicVideo;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");

                    if (updateTopicRequest.TopicMedia != null && updateTopicRequest.TopicMedia.Any())
                    {
                        int totalImageCount = updateTopicRequest.TopicMedia.Count(m =>
                                FileOperations.CheckFileType(allowedContentTypesImage, m.MediaLink));

                        int totalVideoCount = updateTopicRequest.TopicMedia.Count(m =>
                            FileOperations.CheckFileType(allowedContentTypesVideo, m.MediaLink));

                        if (totalImageCount > 3 || totalVideoCount > 3)
                        {
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["MaxItems"], _localizer["TopicMedia"]));
                        }

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
                    }

                    topicEntity.Capture = updateTopicRequest.Capture;
                    topicEntity.Description = updateTopicRequest.Description;

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

            var images = addTopicMediaRequest.TopicImages ?? new List<AddTopicImageRequest>();
            var videos = addTopicMediaRequest.TopicVideos ?? new List<AddTopicVideoRequest>();
            var hasImages = images.Any(i => i.ImageLink != null);
            var hasVideos = videos.Any(v => v.VideoLink != null);
            if (!hasImages && !hasVideos)
            {
                throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["NotEmpty"], _localizer["TopicMedia"]));
            }

            // Check file type for images and videos
            int totalImageCount = images.Count(m => m.ImageLink != null &&
                FileOperations.CheckFileType(allowedContentTypesImage, m.ImageLink));

            int totalVideoCount = videos.Count(m => m.VideoLink != null &&
                FileOperations.CheckFileType(allowedContentTypesVideo, m.VideoLink));
            
            if (totalImageCount != images.Count || totalVideoCount != videos.Count)
            {
                throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], _localizer["TopicMedia"]));
            }

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

                    // Upload new images (include sorting by id)
                    foreach (var topicImage in images.OrderBy(i => i.Id))
                    {
                        if (topicImage.ImageLink == null) continue;

                        var filePath = await FileOperations.SaveFileToLocal(folderPath, topicImage.ImageLink);
                        var publicId = $"{nameof(Domain.Entities.Topic)}_{id}_img_{Guid.NewGuid()}";

                        var result = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, asssetFolderTopicImage, publicId)
                            ?? throw new InvalidOperationException(_localizer["UpdateImageCloudinaryFailed"]);

                        var imageUrl = result["secure_url"]?.ToString()
                            ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        currentImages.Add(new GetTopicImagesResponse
                        {
                            Id = imageIndex++,
                            Capture = topicImage.Capture,
                            ImageLink = imageUrl
                        });

                        FileOperations.DeleteFileFromLocal(filePath, folderPath);
                    }

                    // Upload new videos
                    foreach (var topicVideo in videos.OrderBy(v => v.Id))
                    {
                        if (topicVideo.VideoLink == null) continue;

                        var filePath = await FileOperations.SaveFileToLocal(folderPath, topicVideo.VideoLink);
                        var videoUrl = await _youtube.UploadVideoToYouTube(filePath, topicVideo.Capture);

                        FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        currentVideos.Add(new GetTopicVideoLinkResponse
                        {
                            Id = videoIndex++,
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
            
            if ((updateTopicMediaRequest.TopicImages?.Count ?? 0) > 3 
                || (updateTopicMediaRequest.TopicVideos?.Count ?? 0) > 3)
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

                    // Update existing images 
                    if (updateTopicMediaRequest.TopicImages != null)
                    {
                        foreach (var imageRequest in updateTopicMediaRequest.TopicImages)
                        {
                            if (imageRequest.ImageLink == null)
                            {
                                if (imageRequest.Id > 0)
                                {
                                    // If image ID is provided but no link, only change capture
                                    var existing = currentImages.FirstOrDefault(x => x.Id == imageRequest.Id)
                                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], $"ImageId {imageRequest.Id}"));
                                    existing.Capture = imageRequest.Capture;
                                    continue;
                                };
                            }
                            string secureUrl = null;

                            if (imageRequest.Id > 0)
                            {
                                // Upload and replace
                                var existing = currentImages.FirstOrDefault(x => x.Id == imageRequest.Id)
                                    ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], $"ImageId {imageRequest.Id}"));
                                if (imageRequest.ImageLink != null && imageRequest.ImageLink.Length > 0)
                                {
                                    if (!FileOperations.CheckFileType(allowedContentTypesImage, imageRequest.ImageLink))
                                    {
                                        throw new ArgumentException(CommonExtensions.GetValidateMessage(
                                            _localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}, {CommonFileType.JPG}"));
                                    }

                                    var filePath = await FileOperations.SaveFileToLocal(folderPath, imageRequest.ImageLink);
                                    var publicId = $"{nameof(Domain.Entities.Topic)}_{id}_img_{Guid.NewGuid()}";

                                    var result = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, CommonCloudinaryAttribute.assetFolderTopicImage, publicId)
                                        ?? throw new InvalidOperationException(_localizer["UpdateImageCloudinaryFailed"]);

                                    secureUrl = result["secure_url"]?.ToString()
                                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                                    FileOperations.DeleteFileFromLocal(filePath, folderPath);
                                }
                                if (secureUrl != null)
                                {
                                    existing.ImageLink = secureUrl;
                                }
                                existing.Capture = imageRequest.Capture;
                            }
                            else
                            {
                                // Upload and replace
                                var existing = imageRequest.ImageLink;
                                if (imageRequest.ImageLink != null && imageRequest.ImageLink.Length > 0)
                                {
                                    if (!FileOperations.CheckFileType(allowedContentTypesImage, imageRequest.ImageLink))
                                    {
                                        throw new ArgumentException(CommonExtensions.GetValidateMessage(
                                            _localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}, {CommonFileType.JPG}"));
                                    }

                                    var filePath = await FileOperations.SaveFileToLocal(folderPath, imageRequest.ImageLink);
                                    var publicId = $"{nameof(Domain.Entities.Topic)}_{id}_img_{Guid.NewGuid()}";

                                    var result = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, CommonCloudinaryAttribute.assetFolderTopicImage, publicId)
                                        ?? throw new InvalidOperationException(_localizer["UpdateImageCloudinaryFailed"]);

                                    secureUrl = result["secure_url"]?.ToString()
                                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                                    FileOperations.DeleteFileFromLocal(filePath, folderPath);
                                }

                                currentImages.Add(new GetTopicImagesResponse
                                {
                                    Id = 0,
                                    Capture = imageRequest.Capture,
                                    ImageLink = secureUrl
                                });
                            }
                        }

                        // Re-index image Ids
                        for (int i = 0; i < currentImages.Count; i++)
                        {
                            currentImages[i].Id = i + 1;
                        }
                    }

                    // Update existing videos
                    else if (updateTopicMediaRequest.TopicVideos != null)
                    {
                        foreach (var videoRequest in updateTopicMediaRequest.TopicVideos)
                        {
                            if (videoRequest.VideoLink == null) { 
                                if (videoRequest.Id > 0)
                                {
                                    // If video ID is provided but no link, only change capture
                                    var existing = currentVideos.FirstOrDefault(x => x.Id == videoRequest.Id)
                                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], $"VideoId {videoRequest.Id}"));
                                    existing.Capture = videoRequest.Capture;
                                    continue;
                                }
                            };
                            string videoUrl = null;
                            if (videoRequest.Id > 0)
                            {
                                var existing = currentVideos.FirstOrDefault(x => x.Id == videoRequest.Id)
                                    ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], $"VideoId {videoRequest.Id}"));
                                if (!FileOperations.CheckFileType(allowedContentTypesVideo, videoRequest.VideoLink))
                                {
                                    throw new ArgumentException(CommonExtensions.GetValidateMessage(
                                        _localizer["InvalidFileType"], string.Join(", ", allowedContentTypesVideo)));
                                }

                                var filePath = await FileOperations.SaveFileToLocal(folderPath, videoRequest.VideoLink);
                                videoUrl = await _youtube.UploadVideoToYouTube(filePath, videoRequest.Capture);

                                FileOperations.DeleteFileFromLocal(filePath, folderPath);
                                if (videoUrl != null)
                                {
                                    existing.VideoLink = videoUrl;
                                }

                                existing.Capture = videoRequest.Capture;
                            }
                            else
                            {
                                var existing = videoRequest.VideoLink;
                                if (!FileOperations.CheckFileType(allowedContentTypesVideo, videoRequest.VideoLink))
                                {
                                    throw new ArgumentException(CommonExtensions.GetValidateMessage(
                                        _localizer["InvalidFileType"], string.Join(", ", allowedContentTypesVideo)));
                                }

                                var filePath = await FileOperations.SaveFileToLocal(folderPath, videoRequest.VideoLink);
                                videoUrl = await _youtube.UploadVideoToYouTube(filePath, videoRequest.Capture);

                                FileOperations.DeleteFileFromLocal(filePath, folderPath);

                                currentVideos.Add(new GetTopicVideoLinkResponse
                                {
                                    Id = 0,
                                    Capture = videoRequest.Capture,
                                    VideoLink = videoUrl
                                });
                            }
                        }

                        // Re-index video Ids
                        for (int i = 0; i < currentVideos.Count; i++)
                        {
                            currentVideos[i].Id = i + 1;
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
