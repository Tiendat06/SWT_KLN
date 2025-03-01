namespace Application.Interfaces
{
    public interface IVideoService
    {
        Task<PaginationResponseDto<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input);
        Task<GetVideoResponse?> GetVideoByIdAsync(Guid id);
    }
}
