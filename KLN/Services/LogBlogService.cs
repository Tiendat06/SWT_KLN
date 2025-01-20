using KLN.Models;
using KLN.Repository;

namespace KLN.Services
{
    public class LogBlogService
    {
        private readonly LogBlogRepository _LogBlogRepository;

        public LogBlogService(LogBlogRepository LogBlogRepository)
        {
            _LogBlogRepository = LogBlogRepository;
        }

        public async Task<List<LogBlog>> GetAllLogBlogsAsync()
        {
            return await _LogBlogRepository.GetAllLogBlogsAsync();
        }

        public async Task<LogBlog> GetLogBlogByIdAsync(int id)
        {
            return await _LogBlogRepository.GetLogBlogByIdAsync(id);
        }

        public async Task<List<LogBlog>> GetLogBlogByBlogIdAsync(string id)
        {
            return await _LogBlogRepository.GetLogBlogByBlogIdAsync(id);
        }

        public async Task<LogBlog> CreateLogBlogAsync(LogBlog LogBlog)
        {
            return await _LogBlogRepository.CreateLogBlogAsync(LogBlog);
        }

        public async Task<bool> DeleteLogBlogAsync(int id)
        {
            return await _LogBlogRepository.DeleteLogBlogAsync(id);
        }

        public async Task<LogBlog> LogBlogActionAsync(Blog Blog, string process, string flag)
        {
            var log = new LogBlog
            {
                logBlogId = 0,
                blogId = Blog.blogId,
                blogTitle = Blog.blogTitle,
                blogContent = Blog.blogContent,
                createDate = Blog.createDate,
                userId = Blog.userId,
                process = process,
                updateDate = DateTime.Now,
                flag = flag
            };
            return await CreateLogBlogAsync(log);
        }
    }
}
