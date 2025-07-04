using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns.Enums;

namespace Infrastructure.Repositories
{
    public class TopicRepository : ITopicRepository
    {
        private readonly DatabaseManager _context;
        public TopicRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Topic>> GetAllTopicsAsync(int page, int fetch, int type, int topicType)
        {
            var query = _context.Topics
                .AsNoTracking()
                .Where(topic => topic.IsDeleted == false);

            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);

            // check get images or videos
            if (topicType == (int)TopicTypeEnum.ImageType)
                query = query.Where(x => x.Images != null);
            else if (topicType == (int)TopicTypeEnum.VideoType)
                query = query.Where(x => x.Videos != null);

            // Sắp xếp trước khi phân trang
            query = query.OrderByDescending(topic => topic.CreateDate);

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }

            //Include User và các quan hệ của User
            query = query.Include(topic => topic.User)
                         .ThenInclude(user => user.Account)
                         .ThenInclude(account => account.Role);

            // Lấy danh sách Topic
            var topics = await query.ToListAsync();

            // Với mỗi Topic, load danh sách TopicMedias
            //foreach (var topic in topics)
            //{
            //    topic.TopicMedias = await _context.TopicMedias
            //        .AsNoTracking()
            //        .Where(tm => tm.TopicId == topic.TopicId && tm.IsDeleted == false)
            //        .ToListAsync();
            //}

            return topics;
        }
        public async Task<Topic?> GetTopicByIdAsync(Guid id)
        {
            var topic = await _context.Topics
                .AsNoTracking()
                .Include(topic => topic.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(topic => topic.TopicId == id && topic.IsDeleted == false);

            //if (topic != null)
            //{
            //    // Load danh sách TopicMedias cho topic
            //    topic.TopicMedias = await _context.TopicMedias
            //        .AsNoTracking()
            //        .Where(tm => tm.TopicId == topic.TopicId && (tm.IsDeleted == false || tm.IsDeleted == null))
            //        .ToListAsync();
            //}

            return topic;
        }

        public async Task<int> CountTopicAsync(int type, int topicType)
        {
            var query = _context.Topics
                .AsNoTracking();
            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);

            // check get images or videos
            if (topicType == (int)TopicTypeEnum.ImageType)
                query = query.Where(x => x.Images != null);
            else if (topicType == (int)TopicTypeEnum.VideoType)
                query = query.Where(x => x.Videos != null);

            return await query.CountAsync(x => x.IsDeleted == false);
        }

        public async Task CreateTopicAsync(Topic topic)
        {
            await _context.Topics.AddAsync(topic);
        }
    }
}
