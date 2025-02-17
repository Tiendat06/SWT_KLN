namespace Application.Interfaces
{
    public interface IVideoService
    {
        Task<IEnumerable<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input);
        Task<GetVideoResponse?> GetVideoByIdAsync(Guid id);
    }
}
