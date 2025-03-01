namespace Application.Interfaces
{
    public interface ISlideShowService
    {
        Task<PaginationResponseDto<GetSlideShowResponse>> GetAllSlideShowsAsync(GetSlideShowRequest input);
        Task<GetSlideShowResponse?> GetSlideShowByIdAsync(Guid id);
    }
}
