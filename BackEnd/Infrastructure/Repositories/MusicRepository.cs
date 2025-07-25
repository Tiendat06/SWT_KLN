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

        public async Task<List<Music>> GetMusicByIdsAsync(List<Guid> ids)
        {
            return await _context.Musics
                .AsNoTracking()
                .Where(music => ids.Contains(music.MusicId) && music.IsDeleted == false)
                .ToListAsync();
        }

        public async Task<int> CountMusicAsync(int type)
        {
            var query = _context.Musics
                .AsNoTracking();
            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);
            return await query.CountAsync(x => x.IsDeleted == false);
        }

        public async Task CreateMusicAsync(Music music)
        {
            await _context.Musics.AddAsync(music);
        }

        public async Task<Music> UpdateMusicAsync(Music music)
        {
            _context.Musics.Update(music);
            return music;
        }

        public async Task SoftDeleteMusicAsync(Music music)
        {
            music.IsDeleted = true;
            await Task.CompletedTask;
        }
        //public async Task SoftDeleteMultipleMusicAsync(IEnumerable<Guid> musicIds)
        //{
        //    var musics = await _context.Musics
        //        .Where(m => musicIds.Contains(m.MusicId) && m.IsDeleted == false)
        //        .ToListAsync();

        //    foreach (var music in musics)
        //    {
        //        music.IsDeleted = true;
        //    }

        //    // If you want to persist changes immediately
        //    await _context.SaveChangesAsync();
        //}

        public async Task SoftDeleteMultipleMusicByIdsAsync(List<Guid> ids)
        {
            var musics = await _context.Musics
                .Where(m => ids.Contains(m.MusicId) && m.IsDeleted == false)
                .ToListAsync();

            foreach (var music in musics)
            {
                music.IsDeleted = true;
            }

            _context.Musics.UpdateRange(musics);
        }



        public async Task HardDeleteMusicAsync(Guid id)
        {
            _context.Musics.Remove(new Music { MusicId = id });
            await _context.SaveChangesAsync();
        }
        public Task HardDeleteMusicAsync(Music music)
        {
            throw new NotImplementedException();
        }

        public async Task<Music?> GetMusicByTitleAsync(string musicTitle)
        {
            return await _context.Musics
                .FirstOrDefaultAsync(b => b.Title == musicTitle && (b.IsDeleted == false || b.IsDeleted == null));
        }

    }
}
