using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IBlogRepository
    {
        //Task<IEnumerable<Blog>> GetAllBlogsAsync();
        Task<Blog?> GetBlogByIdAsync(Guid id);
        Task<List<Blog>> GetBlogByIdsAsync(List<Guid> ids);
        Task<IEnumerable<Blog>> GetAllBlogsAsync(int page, int fetch, int type);
        Task CreateBlogAsync(Blog blog);
        Task HardDeleteBlogAsync(Guid id);
        Task SoftDeleteBlogAsync(Blog blog);
        Task SoftDeleteMultipleBlogsByIdsAsync(List<Guid> ids);
        Task<int> CountAllBlogsAsync(int type);
    }
}
