using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns.Enums;

namespace Infrastructure.Repositories
{
    public class MusicRepository : IMusicRepository
    {
        private readonly DatabaseManager _context;
        public MusicRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Music>> GetAllMusicAsync(int fetch, int page, int type)
        {
            var query = _context.Musics
                .AsNoTracking()
                .Where(music => music.IsDeleted == false);

            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);

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

        public async Task<int> CountMusicAsync(int type)
        {
            var query = _context.Musics
                .AsNoTracking();
            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);
            return await query.CountAsync(x => x.IsDeleted == false);
        }

        public async Task<Music> CreateMusicAsync(Music music)
        {
            await _context.Musics.AddAsync(music);
            return music;
        }

        public async Task<Music> UpdateMusicAsync(Music music)
        {
            _context.Musics.Update(music);
            return music;
        }
    }
}
