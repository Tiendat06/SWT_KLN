using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ILogBlogRepository
    {
        Task<IEnumerable<LogBlog>> GetAllLogBlogsAsync();
        Task<LogBlog?> GetLogBlogByIdAsync(int id);
        Task<IEnumerable<LogBlog>> GetLogBlogsByBlogIdAsync(Guid blogId);
        Task CreateLogBlogAsync(LogBlog logBlog);
        Task HardDeleteLogBlogAsync(int id);
        Task SoftDeleteLogBlogAsync(LogBlog logBlog);

    }
}
