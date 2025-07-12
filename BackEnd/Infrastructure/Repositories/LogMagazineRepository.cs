using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class LogMagazineRepository : ILogMagazineRepository
    {
        private readonly DatabaseManager _context;

        public LogMagazineRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateLogMagazineAsync(LogMagazine logMagazine)
        {
            await _context.LogMagazines.AddAsync(logMagazine);
        }

        public async Task CreateLogMagazineRangeAsync(IEnumerable<LogMagazine> logMagazines)
        {
            await _context.LogMagazines.AddRangeAsync(logMagazines);
        }

        public async Task<IEnumerable<LogMagazine>> GetAllLogMagazinesAsync()
        {
            return await _context.LogMagazines
                .AsNoTracking()
                .Include(logMagazine => logMagazine.Magazine)
                .Include(logMagazine => logMagazine.User)
                .ToListAsync();
        }

        public async Task<LogMagazine?> GetLogMagazineByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<LogMagazine>> GetLogMagazinesByMagazineIdAsync(Guid magazineId)
        {
            throw new NotImplementedException();
        }

        public async Task HardDeleteLogMagazineAsync(int id)
        {
            _context.LogMagazines.Remove(new LogMagazine { LogMagazineId = id });
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteLogMagazineAsync(LogMagazine logMagazine)
        {
            logMagazine.Flag = true;
            await Task.CompletedTask;
        }
    }
}
