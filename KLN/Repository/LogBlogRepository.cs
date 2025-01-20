using KLN.Config;
using KLN.Models;
using Microsoft.EntityFrameworkCore;

namespace KLN.Repository
{
    public class LogBlogRepository
    {
        private readonly DatabaseManager _context;

        public LogBlogRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task<List<LogBlog>> GetAllLogBlogsAsync()
        {
            var result = await _context.LogBlogs.ToListAsync();
            if (result == null || !result.Any())
            {
                return null;
            }
            return result;
        }

        public async Task<LogBlog> GetLogBlogByIdAsync(int id)
        {
            var result = await _context.LogBlogs.FindAsync(id);
            return result;
        }

        public async Task<List<LogBlog>> GetLogBlogByBlogIdAsync(string BlogId)
        {
            var result = await _context.LogBlogs.Where(lb => lb.blogId == BlogId).ToListAsync();
            if (result == null || !result.Any())
            {
                return null;
            }
            return result;
        }

        public async Task<LogBlog> CreateLogBlogAsync(LogBlog LogBlog)
        {
            _context.LogBlogs.Add(LogBlog);
            try
            {
                await _context.SaveChangesAsync();
                return LogBlog;
            }
            catch (DbUpdateException)
            {
                return null;
            }
        }

        public async Task<bool> DeleteLogBlogAsync(int id)
        {
            var LogBlog = await _context.LogBlogs.FindAsync(id);
            if (LogBlog == null)
            {
                return false;
            }

            _context.LogBlogs.Remove(LogBlog);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
