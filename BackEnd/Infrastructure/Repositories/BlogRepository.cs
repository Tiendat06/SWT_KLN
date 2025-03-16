using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly DatabaseManager _context;

        public BlogRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateBlogAsync(Blog blog)
        {
            await _context.Blogs.AddAsync(blog);
        }

        //public async Task<IEnumerable<Blog>> GetAllBlogsAsync()
        //{
        //    return await _context.Blogs
        //        .AsNoTracking()
        //        .Where(blog => blog.IsDeleted == false)
        //        .Include(blog => blog.User)
        //        .ThenInclude(user => user.Account)
        //        .ThenInclude(account => account.Role)
        //        .ToListAsync();
        //}

        public async Task<Blog?> GetBlogByIdAsync(Guid id)
        {
            return await _context.Blogs
                .AsNoTracking()
                .Include(blog => blog.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(blog => blog.BlogId == id && blog.IsDeleted == false);
        }

        public async Task<IEnumerable<Blog>> GetAllBlogsAsync(int page, int fetch, int type)
        {
            var query = _context.Blogs
                .AsNoTracking()
                .Where(blog => blog.IsDeleted == false);
            // Sắp xếp trước khi phân trang
            query = query.OrderByDescending(blog => blog.CreateDate);

            // check if type is exists
            if (type > 0)
                query = query.Where(x => x.MediaTypeId == type);

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }
            return await query
                .Include(blog => blog.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }

        public async Task HardDeleteBlogAsync(Guid id)
        {
            _context.Blogs.Remove(new Blog { BlogId = id });
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteBlogAsync(Blog blog)
        {
            blog.IsDeleted = true;
            await Task.CompletedTask;
        }

        public async Task<int> CountAllBlogsAsync(int type)
        {
            var query = _context.Blogs.AsNoTracking();
            if (type > 0)
                query = query.Where(x => x.MediaTypeId == type);
            return await query.CountAsync(x => x.IsDeleted == false);
        }
    }
}
