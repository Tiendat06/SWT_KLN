using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using System.Reflection.Metadata;

namespace Infrastructure.Repositories
{
    public class LogBlogRepository : ILogBlogRepository
    {
        private readonly DatabaseManager _context;

        public LogBlogRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateLogBlogAsync(LogBlog logBlog)
        {
            await _context.LogBlogs.AddAsync(logBlog);
        }

        public async Task<IEnumerable<LogBlog>> GetAllLogBlogsAsync()
        {
            return await _context.LogBlogs
                .AsNoTracking()
                .Include(logBlog => logBlog.Blog)
                .Include(logBlog => logBlog.User)
                .ToListAsync();
        }

        public async Task<LogBlog?> GetLogBlogByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<LogBlog>> GetLogBlogsByBlogIdAsync(Guid blogId)
        {
            throw new NotImplementedException();
        }

        public async Task HardDeleteLogBlogAsync(int id)
        {
            _context.LogBlogs.Remove(new LogBlog { LogBlogId = id });
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteLogBlogAsync(LogBlog logBlog)
        {
            logBlog.Flag = true;
            await Task.CompletedTask;
        }
    }
}
