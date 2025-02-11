using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class MagazineRepository : IMagazineRepository
    {
        private readonly DatabaseManager _context;

        public MagazineRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateMagazineAsync(Magazine magazine)
        {
            await _context.Magazines.AddAsync(magazine);
        }

        public async Task<IEnumerable<Magazine>> GetAllMagazinesAsync()
        {
            return await _context.Magazines
                .AsNoTracking()
                .Where(magazine => magazine.IsDeleted == false)
                .Include(magazine => magazine.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }

        public async Task<Magazine?> GetMagazineByIdAsync(Guid id)
        {
            return await _context.Magazines
                .AsNoTracking()
                .Include(magazine => magazine.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(magazine => magazine.MagazineId == id && magazine.IsDeleted == false);
        }

        public async Task HardDeleteMagazineAsync(Guid id)
        {
            _context.Magazines.Remove(new Magazine { MagazineId = id });
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteMagazineAsync(Magazine magazine)
        {
            magazine.IsDeleted = true;
            await Task.CompletedTask;
        }
    }
}
