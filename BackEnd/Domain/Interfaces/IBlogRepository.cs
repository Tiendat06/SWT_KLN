using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IBlogRepository
    {
        Task<IEnumerable<Blog>> GetAllBlogsAsync();
        Task<Blog?> GetBlogByIdAsync(Guid id);
        Task CreateBlogAsync(Blog blog);
        Task HardDeleteBlogAsync(Guid id);
        Task SoftDeleteBlogAsync(Blog blog);
    }
}
