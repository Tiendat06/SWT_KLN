using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using System.Security.Principal;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Infrastructure.Repositories
{
    public class VideoRepository : IVideoRepository
    {
        private readonly DatabaseManager _context;
        public VideoRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Video>> GetAllVideosAsync(int page, int fetch)
        {
            var query = _context.Videos
                .AsNoTracking()
                .Where(video => video.IsDeleted == false);
            // Sắp xếp trước khi phân trang
            query = query.OrderByDescending(videos => videos.CreateDate);

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }
            return await query
                .Include(video => video.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }
        public async Task<Video?> GetVideoByIdAsync(Guid id)
        {
            return await _context.Videos
                .AsNoTracking()
                .Include(video => video.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(video => video.VideoId == id && video.IsDeleted == false);
        }
    }
}
