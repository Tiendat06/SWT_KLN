using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogBlogService : ILogBlogService
    {
        private readonly ILogBlogRepository _logBlogRepository;
        private readonly IUnitOfWork _unitOfWork;

        public LogBlogService(ILogBlogRepository logBlogRepository, IUnitOfWork unitOfWork)
        {
            _logBlogRepository = logBlogRepository;
            _unitOfWork = unitOfWork;
        }

        //public async Task<List<LogBlog>> GetAllLogBlogsAsync()
        //{
        //    return await _LogBlogRepository.GetAllLogBlogsAsync();
        //}

        //public async Task<LogBlog> GetLogBlogByIdAsync(int id)
        //{
        //    return await _LogBlogRepository.GetLogBlogByIdAsync(id);
        //}

        //public async Task<List<LogBlog>> GetLogBlogByBlogIdAsync(string id)
        //{
        //    return await _LogBlogRepository.GetLogBlogByBlogIdAsync(id);
        //}

        //public async Task<LogBlog> CreateLogBlogAsync(LogBlog LogBlog)
        //{
        //    return await _LogBlogRepository.CreateLogBlogAsync(LogBlog);
        //}

        //public async Task<bool> DeleteLogBlogAsync(int id)
        //{
        //    return await _LogBlogRepository.DeleteLogBlogAsync(id);
        //}

        //public async Task<LogBlog> LogBlogActionAsync(Blog Blog, string process, string flag)
        //{
        //    var log = new LogBlog
        //    {
        //        LogBlogId = 0,
        //        BlogId = Blog.BlogId,
        //        BlogTitle = Blog.BlogTitle,
        //        BlogContent = Blog.BlogContent,
        //        CreateDate = Blog.CreateDate,
        //        UserId = Blog.UserId,
        //        Process = process,
        //        UpdateDate = DateTime.Now,
        //        Flag = flag
        //    };
        //    return await CreateLogBlogAsync(log);
        //}
    }
}
