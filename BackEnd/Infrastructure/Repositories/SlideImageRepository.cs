using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class SlideImageRepository : ISlideImageRepository
    {
        private readonly DatabaseManager _context;
        public SlideImageRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SlideImage>> GetAllSlideImagesAsync()
        {
            return await _context.SlideImages
                .AsNoTracking()
                .Where(slideImage => slideImage.IsDeleted == false)
                .Include(slideImage => slideImage.SlideShow)
                .ThenInclude(slideShow => slideShow.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }
        public async Task<SlideImage?> GetSlideImageByIdAsync(Guid id)
        {
            return await _context.SlideImages
                .AsNoTracking()
                .Include(slideImage => slideImage.SlideShow)
                .ThenInclude(slideShow => slideShow.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(slideImage => slideImage.SlideImageId == id && slideImage.IsDeleted == false);
        }
    }
}
