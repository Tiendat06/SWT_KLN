using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using System.Security.Principal;
using System.Reflection.Metadata;

namespace Infrastructure.Repositories
{
    public class VideoRepository : IVideoRepository
    {
        private readonly DatabaseManager _context;
        public VideoRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Video>> GetAllVideosAsync()
        {
            return await _context.Videos
                .AsNoTracking()
                .Where(video => video.IsDeleted == false)
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
