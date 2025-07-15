using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ILogMagazineRepository
    {
        Task<IEnumerable<LogMagazine>> GetAllLogMagazinesAsync();
        Task<LogMagazine?> GetLogMagazineByIdAsync(int id);
        Task<IEnumerable<LogMagazine>> GetLogMagazinesByMagazineIdAsync(Guid magazineId);
        Task CreateLogMagazineAsync(LogMagazine logMagazine);
        Task CreateLogMagazineRangeAsync(IEnumerable<LogMagazine> logMagazines);
        Task HardDeleteLogMagazineAsync(int id);
        Task SoftDeleteLogMagazineAsync(LogMagazine logMagazine);
    }
}
