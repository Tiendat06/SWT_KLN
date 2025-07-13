using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns.Enums;
using System.Linq;
using System.Text.Json;
using Application;

namespace Infrastructure.Repositories
{
    public class SlideShowRepository : ISlideShowRepository
    {
        private readonly DatabaseManager _context;
        public SlideShowRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task CreateSlideShowAsync(SlideShow slideShow)
        {
            await _context.SlideShows.AddAsync(slideShow);
        }

        public async Task<IEnumerable<SlideShow>> GetAllSlideShowsAsync(int page, int fetch, int type, int slideShowType)
        {
            var query = _context.SlideShows
                .AsNoTracking()
                .Where(SlideShow => SlideShow.IsDeleted == false);

            // check slide show type is exists
            if (slideShowType > (int)SlideShowTypeEnum.None)
                query = query.Where(x => x.SlideShowTypeId == slideShowType);

            // check if type is exists
            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);

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

        public async Task<List<SlideShow>> GetSlideShowsByIdsAsync(List<Guid> ids)
        {
            return await _context.SlideShows
                .AsNoTracking()
                .Where(slideShow => ids.Contains(slideShow.SlideShowId) && slideShow.IsDeleted == false)
                .ToListAsync();
        }

        public async Task<int> CountSlideShowAsync(int type, int slideShowType)
        {
            var query = _context.SlideShows.AsNoTracking();
            if (slideShowType > (int)SlideShowTypeEnum.None)
                query = query.Where(x => x.SlideShowTypeId == slideShowType);

            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);
            return await query.CountAsync(x => x.IsDeleted == false);
        }

        public async Task<int> CountSlideImageInSpecificSlideShow(int type, int slideShowType)
        {
            var query = _context.SlideShows.AsNoTracking();
            if (slideShowType > (int)SlideShowTypeEnum.None)
                query = query.Where(x => x.SlideShowTypeId == slideShowType);

            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);
            var slideShow = await query.FirstOrDefaultAsync(x => x.IsDeleted == false);
            var slideImage = slideShow?.SlideImage != null ?
                JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage) :
                new List<GetSlideImageResponse>();
            return slideImage.Count;
        }

        public async Task HardDeleteSlideShowAsync(Guid id)
        {
            _context.SlideShows.Remove(new SlideShow { SlideShowId = id });
            await Task.CompletedTask;
        }

        public async Task SoftDeleteSlideShowAsync(SlideShow slideShow)
        {
            slideShow.IsDeleted = true;
            await Task.CompletedTask;
        }

        public async Task SoftDeleteSlideShowsAsync(List<SlideShow> slideShows)
        {
            foreach (var slideShow in slideShows)
            {
                slideShow.IsDeleted = true;
            }

            _context.SlideShows.UpdateRange(slideShows);
            await Task.CompletedTask;
        }

        public async Task<SlideShow?> GetSlideShowByTitleAsync(string slideShowTitle)
        {
            return await _context.SlideShows
                .FirstOrDefaultAsync(b => b.Title == slideShowTitle && (b.IsDeleted == false || b.IsDeleted == null));
        }

    }
}
