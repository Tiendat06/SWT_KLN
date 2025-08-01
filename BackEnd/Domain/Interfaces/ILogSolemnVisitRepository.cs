using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ILogSolemnVisitRepository
    {
        Task CreateLogSolemnVisitAsync(LogSolemnVisit log);
        Task CreateLogSolemVisitRangeAsync(IEnumerable<LogSolemnVisit> logs);
    }
}
