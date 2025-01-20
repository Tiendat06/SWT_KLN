using KLN.Config;
using KLN.Models;
using KLN.Services;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace KLN.Repository
{
    public class BlogRepository
    {
        private readonly DatabaseManager _context;

        public BlogRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task<List<Blog>> GetAllBlogsAsync()
        {
            var result = await _context.Blogs.ToListAsync();
            if (result == null || !result.Any())
            {
                return null;
            }
            return result;
        }

        public async Task<Blog> GetBlogByIdAsync(string id)
        {
            return await _context.Blogs.FindAsync(id);
        }

        public async Task<bool> UpdateBlogAsync(Blog Blog)
        {
            var existingBlog = await _context.Blogs.FindAsync(Blog.blogId);
            if (existingBlog == null)
            {
                return false;
            }
            existingBlog.blogTitle = Blog.blogTitle;
            existingBlog.blogContent = Blog.blogContent;
            existingBlog.createDate = Blog.createDate;
            existingBlog.userId = Blog.userId;
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }

        public async Task<Blog> CreateBlogAsync(Blog Blog)
        {
            _context.Blogs.Add(Blog);
            try
            {
                await _context.SaveChangesAsync();
                return Blog;
            }
            catch (DbUpdateException)
            {

                return null;

            }
        }

        public async Task<Blog> DeleteBlogAsync(string id)
        {
            var Blog = await _context.Blogs.FindAsync(id);
            if (Blog == null)
            {
                return null;
            }

            _context.Blogs.Remove(Blog);
            await _context.SaveChangesAsync();
            return Blog;
        }
    }
}
