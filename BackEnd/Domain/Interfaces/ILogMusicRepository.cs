using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ILogMusicRepository
    {
        Task<IEnumerable<LogMusic>> GetAllLogMusicsAsync();
        Task<LogMusic?> GetLogMusicByIdAsync(int id);
        Task<IEnumerable<LogMusic>> GetLogMusicsByMusicIdAsync(Guid musicId);
        Task CreateLogMusicAsync(LogMusic logMusic);
        Task CreateLogMusicRangeAsync(IEnumerable<LogMusic> logMusics);
        Task HardDeleteLogMusicAsync(int id);
        Task SoftDeleteLogMusicAsync(LogMusic logMusic);
    }
}
