using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using System.Security.Principal;
using System.Reflection.Metadata;

namespace Infrastructure.Repositories
{
    public class SlideShowRepository : ISlideShowRepository
    {
        private readonly DatabaseManager _context;
        public SlideShowRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SlideShow>> GetAllSlideShowsAsync()
        {
            return await _context.SlideShows
                .AsNoTracking()
                .Where(slideShow => slideShow.IsDeleted == false)
                .Include(slideShow => slideShow.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }
        public async Task<SlideShow?> GetSlideShowByIdAsync(Guid id)
        {
            return await _context.SlideShows
                .AsNoTracking()
                .Include(slideShow => slideShow.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(slideShow => slideShow.SlideShowId == id && slideShow.IsDeleted == false);
        }
    }
}
