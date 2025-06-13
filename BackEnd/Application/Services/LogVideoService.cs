using Application.Interfaces;
using Domain;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns;

namespace Application.Services
{
    public class LogVideoService(
        ILogVideoRepository logVideoRepository,
        IUnitOfWork unitOfWork
        ) : ILogVideoService
    {
        public async Task<PaginationResponseDto<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input)
        {
            // Implementation for fetching all videos with pagination
            throw new NotImplementedException();
        }

        public async Task<GetVideoResponse?> GetVideoByIdAsync(Guid id)
        {
            // Implementation for fetching a video by its ID
            throw new NotImplementedException();
        }

        public async Task<GetVideoResponse> CreateVideoAsync(AddVideoRequest addVideoRequest)
        {
            // Implementation for creating a new video
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteMultipleVideoAsync(List<Guid> ids)
        {
            // Implementation for deleting multiple videos
            throw new NotImplementedException();
        }

        public async Task<GetVideoResponse> UpdateVideoAsync(Guid id, UpdateVideoRequest updateVideoRequest)
        {
            // Implementation for updating a video
            throw new NotImplementedException();
        }

        public async Task<GetTotalVideoResponse> GetTotalVideoAsync(GetTotalVideoRequest input)
        {
            // Implementation for fetching total video count
            throw new NotImplementedException();
        }
    }
}
