using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.YouTube.v3.Data;
using Google.Apis.YouTube.v3;

namespace KLN.Shared.CrossCuttingConcerns.Utils
{
    public class YoutubeOperations
    {
        public async Task<string> UploadVideoToYouTube(string filePath, string title)
        {
            // --- Authentication ---
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

            // --- Create YouTubeService ---
            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "KLN Youtube Uploader"
            });

            // --- Create Video object ---
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

            // --- create iframe link that embed video ---
            return $"https://www.youtube.com/embed/{videoId}";
        }
    }
}
