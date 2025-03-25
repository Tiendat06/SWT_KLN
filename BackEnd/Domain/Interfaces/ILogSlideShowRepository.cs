using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ILogSlideShowRepository
    {
        Task<IEnumerable<LogSlideShow>> GetAllLogSlideShowsAsync();
        Task<LogSlideShow?> GetLogSlideShowByIdAsync(int id);
        Task<IEnumerable<LogSlideShow>> GetLogSlideShowsBySlideShowIdAsync(int slideShowId);
        Task CreateLogSlideShowAsync(LogSlideShow logSlideShow);
        Task HardDeleteLogSlideShowAsync(int id);
        Task SoftDeleteLogSlideShowAsync(LogSlideShow logSlideShow);
    }
}
