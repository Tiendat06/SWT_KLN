namespace Application.Interfaces
{
    public interface IVideoService
    {
        Task<IEnumerable<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input);
        Task<GetVideoResponse?> GetVideoByIdAsync(Guid id);
        Task<GetVideoResponse> CreateVideoAsync(AddVideoRequest addVideoRequest);
        Task<bool> DeleteVideoAsync(Guid id);
        Task<GetVideoResponse> UpdateVideoAsync(Guid id, UpdateVideoRequest updateVideoRequest);
    }
}
