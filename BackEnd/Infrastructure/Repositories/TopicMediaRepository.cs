using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class TopicMediaRepository : ITopicMediaRepository
    {
        private readonly DatabaseManager _context;
        public TopicMediaRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TopicMedia>> GetTopicMediaByTopicIdAsync(Guid id, string mediaType)
        {
            var query = _context.TopicMedias
                .AsNoTracking()
                .Where(tm => tm.TopicId == id && tm.IsDeleted == false);

            // Lọc theo loại media
            switch (mediaType.ToLower())
            {
                case "image":
                    query = query.Where(tm => tm.ImageLink != null);
                    break;
                case "video":
                    query = query.Where(tm => tm.VideoLink != null);
                    break;
                default:
                    break;
            }

            return await query.ToListAsync();

        }
    }
}
