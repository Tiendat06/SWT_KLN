using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class LogVideoRepository : ILogVideoRepository
    {
        private readonly DatabaseManager _context;

        public LogVideoRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateLogVideoAsync(LogVideo logVideo)
        {
            await _context.LogVideos.AddAsync(logVideo);
        }

        public async Task<IEnumerable<LogVideo>> GetAllLogVideosAsync()
        {
            return await _context.LogVideos
                .AsNoTracking()
                .Include(logVideo => logVideo.Video)
                .Include(logVideo => logVideo.User)
                .ToListAsync();
        }

        public async Task<LogVideo?> GetLogVideoByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<LogVideo>> GetLogVideosByVideoIdAsync(Guid videoId)
        {
            throw new NotImplementedException();
        }

        public async Task HardDeleteLogVideoAsync(int id)
        {
            _context.LogVideos.Remove(new LogVideo { LogVideoId = id });
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteLogVideoAsync(LogVideo logVideo)
        {
            logVideo.Flag = true;
            await Task.CompletedTask;
        }

        public async Task CreateLogVideoRangeAsync(IEnumerable<LogVideo> logVideos)
        {
            await _context.LogVideos.AddRangeAsync(logVideos);
            await _context.SaveChangesAsync();
        }
    }
}
