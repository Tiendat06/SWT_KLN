
namespace Application.Interfaces
{
    public interface ILogSlideShowService
    {
        Task<IEnumerable<GetSlideShowResponse>> GetAllSlideShowsAsync();
        Task<GetSlideShowResponse?> GetSlideShowByIdAsync(Guid id);
    }
}
