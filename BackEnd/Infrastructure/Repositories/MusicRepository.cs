using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using System.Security.Principal;
using System.Reflection.Metadata;

namespace Infrastructure.Repositories
{
    public class MusicRepository : IMusicRepository
    {
        private readonly DatabaseManager _context;
        public MusicRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Music>> GetAllMusicAsync()
        {
            return await _context.Musics
                .AsNoTracking()
                .Where(music => music.IsDeleted == false)
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
