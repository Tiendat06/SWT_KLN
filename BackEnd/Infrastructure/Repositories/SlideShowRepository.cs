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
        public async Task<IEnumerable<SlideShow>> GetAllSlideShowsAsync(int page, int fetch)
        {
            var query = _context.SlideShows
                .AsNoTracking()
                .Where(SlideShow => SlideShow.IsDeleted == false);

            // Sắp xếp trước khi phân trang
            query = query.OrderByDescending(SlideShows => SlideShows.CreateDate);

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }

            //Include User và các quan hệ của User
            query = query.Include(SlideShow => SlideShow.User)
                         .ThenInclude(user => user.Account)
                         .ThenInclude(account => account.Role);

            // Lấy danh sách Topic
            var slideShows = await query.ToListAsync();

            // Với mỗi Topic, load danh sách TopicMedias
            foreach (var slideShow in slideShows)
            {
                slideShow.SlideImages = await _context.SlideImages
                    .AsNoTracking()
                    .Where(tm => tm.SlideShowId == slideShow.SlideShowId && tm.IsDeleted == false)
                    .ToListAsync();
            }

            return slideShows;
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
