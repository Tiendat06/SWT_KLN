using KLN.Models;
using KLN.Repository;

namespace KLN.Services
{
    public class BlogService
    {
        private readonly BlogRepository _BlogRepository;

        public BlogService(BlogRepository BlogRepository)
        {
            _BlogRepository = BlogRepository;
        }

        public async Task<List<Blog>> GetAllBlogsAsync()
        {
            return await _BlogRepository.GetAllBlogsAsync();
        }

        public async Task<Blog> GetBlogByIdAsync(string id)
        {
            return await _BlogRepository.GetBlogByIdAsync(id);
        }

        public async Task<bool> UpdateBlogAsync(Blog Blog)
        {
            return await _BlogRepository.UpdateBlogAsync(Blog);
        }

        public async Task<Blog> CreateBlogAsync(Blog Blog)
        {
            return await _BlogRepository.CreateBlogAsync(Blog);
        }

        public async Task<Blog> DeleteBlogAsync(string id)
        {
            return await _BlogRepository.DeleteBlogAsync(id);
        }
    }
}
