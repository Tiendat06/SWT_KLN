namespace Application.Interfaces
{
    public interface ISlideShowService
    {
        Task<IEnumerable<GetSlideShowResponse>> GetAllSlideShowsAsync(GetSlideShowRequest input);
        Task<GetSlideShowResponse?> GetSlideShowByIdAsync(Guid id);
    }
}
