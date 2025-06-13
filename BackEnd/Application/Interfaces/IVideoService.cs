using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface IVideoService
    {
        Task<PaginationResponseDto<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input);
        Task<GetVideoResponse?> GetVideoByIdAsync(Guid id);
        Task<GetVideoResponse> CreateVideoAsync(AddVideoRequest addVideoRequest);
        Task<bool> DeleteVideoAsync(Guid id);
        Task<GetVideoResponse> UpdateVideoAsync(Guid id, UpdateVideoRequest updateVideoRequest);
        Task<GetTotalVideoResponse> GetTotalVideoAsync(GetTotalVideoRequest input);
        Task<bool> DeleteMultipleVideoAsync(List<Guid> ids);
    }
}
