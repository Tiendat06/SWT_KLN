using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns.Enums;

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

        public async Task<IEnumerable<Magazine>> GetAllMagazinesAsync(int page, int fetch, int type)
        {
            var query = _context.Magazines
                .AsNoTracking()
                .Where(magazine => magazine.IsDeleted == false);

            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);

            // Sắp xếp trước khi phân trang
            query = query.OrderByDescending(magazine => magazine.CreateDate);

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }
            return await query
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
        public async Task<List<Magazine>> GetMagazinesByIdsAsync(List<Guid> ids)
        {
            return await _context.Magazines
                .AsNoTracking()
                .Where(magazine => ids.Contains(magazine.MagazineId) && magazine.IsDeleted == false)
                .ToListAsync();
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

        public async Task SoftDeleteMultipleMagazineByIdsAsync(List<Guid> ids)
        {
            var magazines = await _context.Magazines
                .Where(magazine => ids.Contains(magazine.MagazineId) && magazine.IsDeleted == false)
                .ToListAsync();
            foreach (var magazine in magazines)
            {
                magazine.IsDeleted = true;
            }
            await _context.SaveChangesAsync();
        }

        public async Task<int> CountMagazineAsync(int type)
        {
            var query = _context.Magazines
                .AsNoTracking();
            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);
            return await query.CountAsync(x => x.IsDeleted == false);
        }
    }
}
