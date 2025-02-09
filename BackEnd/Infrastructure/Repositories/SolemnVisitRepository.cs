using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using System.Security.Principal;
using System.Reflection.Metadata;

namespace Infrastructure.Repositories
{
    public class SolemnVisitRepository : ISolemnVisitRepository
    {
        private readonly DatabaseManager _context;
        public SolemnVisitRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SolemnVisit>> GetAllSolemnVisitsAsync()
        {
            return await _context.SolemnVisits
                .AsNoTracking()
                .Where(solemnVisit => solemnVisit.IsDeleted == false)
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
