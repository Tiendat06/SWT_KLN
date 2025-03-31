using Infrastructure.Persistence;
using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class LogSlideShowRepository : ILogSlideShowRepository
    {
        private readonly DatabaseManager _context;

        public LogSlideShowRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateLogSlideShowAsync(LogSlideShow logSlideShow)
        {
            await _context.LogSlideShows.AddAsync(logSlideShow);
        }

        public async Task<IEnumerable<LogSlideShow>> GetAllLogSlideShowsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<LogSlideShow?> GetLogSlideShowByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<LogSlideShow>> GetLogSlideShowsBySlideShowIdAsync(int slideShowId)
        {
            throw new NotImplementedException();
        }

        public async Task HardDeleteLogSlideShowAsync(int id)
        {
            _context.LogSlideShows.Remove(new LogSlideShow { LogSlideShowId = id });
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteLogSlideShowAsync(LogSlideShow logSlideShow)
        {
            logSlideShow.Flag = true;
            await Task.CompletedTask;
        }
    }
}
