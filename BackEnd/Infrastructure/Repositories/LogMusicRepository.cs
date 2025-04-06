using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class LogMusicRepository : ILogMusicRepository
    {
        private readonly DatabaseManager _context;
        public LogMusicRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task CreateLogMusicAsync(LogMusic logMusic)
        {
            await _context.LogMusics.AddAsync(logMusic);
        }
        public async Task<IEnumerable<LogMusic>> GetAllLogMusicsAsync()
        {
            return await _context.LogMusics
                .AsNoTracking()
                .Include(logMusic => logMusic.Music)
                .Include(logMusic => logMusic.User)
                .ToListAsync();
        }
        public async Task<LogMusic?> GetLogMusicByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<LogMusic>> GetLogMusicsByMusicIdAsync(Guid musicId)
        {
            throw new NotImplementedException();
        }
        public async Task HardDeleteLogMusicAsync(int id)
        {
            _context.LogMusics.Remove(new LogMusic { LogMusicId = id });
            await _context.SaveChangesAsync();
        }
        public async Task SoftDeleteLogMusicAsync(LogMusic logMusic)
        {
            logMusic.Flag = true;
            await Task.CompletedTask;
        }
    }
}
