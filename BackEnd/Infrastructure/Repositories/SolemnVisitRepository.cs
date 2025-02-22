using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class SolemnVisitRepository : ISolemnVisitRepository
    {
        private readonly DatabaseManager _context;
        public SolemnVisitRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SolemnVisit>> GetAllSolemnVisitsAsync(int page, int fetch)
        {
            var query = _context.SolemnVisits
            .AsNoTracking()
            .Where(solemnVisit => solemnVisit.IsDeleted == false);
            // Sắp xếp trước khi phân trang
            query = query.OrderByDescending(solemnVisits => solemnVisits.CreateDate);

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }
            return await query
                .Include(solemnVisit => solemnVisit.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }
        public async Task<SolemnVisit?> GetSolemnVisitByIdAsync(Guid id)
        {
            return await _context.SolemnVisits
                .AsNoTracking()
                .Include(solemnVisit => solemnVisit.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(solemnVisit => solemnVisit.VisitId == id && solemnVisit.IsDeleted == false);
        }
    }
}
