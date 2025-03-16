using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class SlideShowTypeRepository(
        DatabaseManager _context
        ) : ISlideShowTypeRepository
    {
        public async Task<IEnumerable<SlideShowType>> GetSlideShowTypeListAsync(int page, int fetch)
        {
            var query = _context.SlideShowTypes
                .AsNoTracking();

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }

            var slideShowsType = await query.ToListAsync();

            return slideShowsType;
        }

        public async Task<int> CountSlideShowTypeAsync()
        {
            return await _context.SlideShowTypes.CountAsync();
        }
    }
}
