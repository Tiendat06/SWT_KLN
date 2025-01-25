using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using System.Security.Principal;
using System.Reflection.Metadata;

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

        public async Task<IEnumerable<Blog>> GetAllBlogsAsync()
        {
            return await _context.Blogs
                .AsNoTracking()
                .Where(blog => blog.IsDeleted == false)
                .Include(blog => blog.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }

        public async Task<Blog?> GetBlogByIdAsync(Guid id)
        {
            return await _context.Blogs
                .AsNoTracking()
                .Include(blog => blog.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(blog => blog.BlogId == id && blog.IsDeleted == false);
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
    }
}
