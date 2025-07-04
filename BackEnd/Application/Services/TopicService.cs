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
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.YouTube.v3.Data;
using Google.Apis.YouTube.v3;

namespace Application.Services
{
    public class TopicService(
        ITopicRepository _topicRepository,
        IConfiguration _configuration,
        IUnitOfWork _unitOfWork,
        Cloudinary _cloudinary,
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
                try
                {
                    Guid newGuid = Guid.NewGuid();
                    var asssetFolderTopicImage = CommonCloudinaryAttribute.assetFolderTopicImage;
                    var assetFolderTopicVideo = CommonCloudinaryAttribute.assetFolderTopicVideo;
                    var publicId = $"{nameof(Topic)}_{newGuid}";

                    var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG, CommonFileType.JPG };
                    var allowedContentTypesVideo = new[] { CommonFileType.MP4, CommonFileType.AVI, CommonFileType.MOV, CommonFileType.WMV, CommonFileType.FLV, CommonFileType.MKV, CommonFileType.WEBM, CommonFileType.MPEG };
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
                            string videoLink = await UploadVideoToYouTube(filePathVideo, topicMediaRequest.Capture);

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

        public async Task<string> UploadVideoToYouTube(string filePath, string title)
        {
            // --- Xác thực ---
            UserCredential credential;
            var path = Path.Combine(Directory.GetCurrentDirectory(), "Secret", "client_secret.json");
            using (var stream = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    new[] { YouTubeService.Scope.YoutubeUpload },
                    "user",
                    CancellationToken.None
                );
            }

            // --- Tạo YouTubeService ---
            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "KLN Youtube Uploader"
            });

            // --- Tạo Video object ---
            var video = new Google.Apis.YouTube.v3.Data.Video();
            video.Snippet = new VideoSnippet();
            video.Snippet.Title = title;
            video.Snippet.CategoryId = "22";
            video.Status = new VideoStatus();
            video.Status.PrivacyStatus = "unlisted";


            // --- Upload video ---
            string videoId = null;
            using (var fileStream = new FileStream(filePath, FileMode.Open))
            {
                var videosInsertRequest = youtubeService.Videos.Insert(video, "snippet,status", fileStream, "video/*");
                videosInsertRequest.ProgressChanged += (progress) =>
                {
                    Console.WriteLine($"Upload status: {progress.Status}, bytes sent: {progress.BytesSent}");
                };
                videosInsertRequest.ResponseReceived += (uploadedVideo) =>
                {
                    videoId = uploadedVideo.Id;
                    Console.WriteLine($"Video uploaded: {videoId}");
                };

                await videosInsertRequest.UploadAsync();
            }

            if (videoId == null)
                throw new InvalidOperationException("Upload video to YouTube failed.");

            // --- Tạo link iframe embed video ---
            return $"https://www.youtube.com/embed/{videoId}";
        }
    }
}
