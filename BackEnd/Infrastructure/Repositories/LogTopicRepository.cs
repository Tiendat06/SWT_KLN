using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class LogTopicRepository : ILogTopicRepository
    {
        private readonly DatabaseManager _context;

        public LogTopicRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateLogTopicRangeAsync(IEnumerable<LogTopic> logTopic)
        {
            await _context.LogTopics.AddRangeAsync(logTopic);
            await _context.SaveChangesAsync();
        }
    }
}
