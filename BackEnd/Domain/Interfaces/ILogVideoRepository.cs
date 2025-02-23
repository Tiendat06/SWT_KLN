using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ILogVideoRepository
    {
        Task<IEnumerable<LogVideo>> GetAllLogVideosAsync();
        Task<LogVideo?> GetLogVideoByIdAsync(int id);
        Task<IEnumerable<LogVideo>> GetLogVideosByVideoIdAsync(Guid videoId);
        Task CreateLogVideoAsync(LogVideo logVideo);
        Task HardDeleteLogVideoAsync(int id);
        Task SoftDeleteLogVideoAsync(LogVideo logVideo);
    }
}
