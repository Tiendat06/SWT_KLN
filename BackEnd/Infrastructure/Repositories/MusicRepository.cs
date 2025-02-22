using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class MusicRepository : IMusicRepository
    {
        private readonly DatabaseManager _context;
        public MusicRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Music>> GetAllMusicAsync(int fetch, int page)
        {
            var query = _context.Musics
                .AsNoTracking()
                .Where(music => music.IsDeleted == false);
            // Sắp xếp trước khi phân trang
            query = query.OrderByDescending(musics => musics.CreateDate);

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }
            return await query
                .Include(music => music.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }
        public async Task<Music?> GetMusicByIdAsync(Guid id)
        {
            return await _context.Musics
                .AsNoTracking()
                .Include(music => music.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(music => music.MusicId == id && music.IsDeleted == false);
        }

    }
}
