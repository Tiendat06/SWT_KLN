using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KLN.Config;
using KLN.Models;
using KLN.Services;

namespace KLN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogService _blogService;
        private readonly LogBlogService _logBlogService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public BlogController(BlogService blogService, LogBlogService logBlogService)
        {
            _blogService = blogService;
            _logBlogService = logBlogService;
        }

        // GET: api/Blog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlog()
        {
            var blogs = await _blogService.GetAllBlogsAsync();
            return Ok(new { status = true, data = blogs, msg = "Load blogs successfully" });
        }

        // GET: api/Blog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlog(string id)
        {
            var blog = await _blogService.GetBlogByIdAsync(id);

            if (blog == null)
            {
                return NotFound(new { status = false, msg = "Blog not found" });
            }

            return Ok(new { status = true, data = blog, msg = "Load blog successfully" });
        }

        // PUT: api/Blog/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlog(string id, Blog blog)
        {
            if (id != blog.blogId)
            {
                return BadRequest(new { status = false, msg = "Blog ID mismatch" });
            }
            var oldBlog = await _blogService.GetBlogByIdAsync(id);
            if (oldBlog == null)
            {
                return NotFound(new { status = false, msg = "Blog not found" });
            }
            await _logBlogService.LogBlogActionAsync(oldBlog, "Update", "O");

            var result = await _blogService.UpdateBlogAsync(blog);
            if (!result)
            {
                return NotFound(new { status = false, msg = "Blog not found" });
            }
            await _logBlogService.LogBlogActionAsync(blog, "Update", "N");

            return Ok(new { status = true, data = blog, msg = "Update blog successfully" });
        }

        // POST: api/Blog
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Blog>> PostBlog(Blog blog)
        {
            var createdBlog = await _blogService.CreateBlogAsync(blog);
            if (createdBlog == null)
            {
                return BadRequest(new { status = false, msg = "Error in creating blog" });
            }

            var createdLog = await _logBlogService.LogBlogActionAsync(createdBlog, "Create", "N");
            if (createdLog == null)
            {
                return BadRequest(new { status = false, msg = "Error in creating log blog" });
            }

            return CreatedAtAction("GetBlog", new { id = blog.blogId }, new { status = true, data = createdBlog, msg = "Blog created successfully" });
        }

        // DELETE: api/Blog/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(string id)
        {
            var blog = await _blogService.DeleteBlogAsync(id);
            if (blog == null)
            {
                return NotFound(new { status = false, msg = "Blog not found" });
            }

            var log = await _logBlogService.LogBlogActionAsync(blog, "Delete", "N");
            if (log == null)
            {
                return BadRequest(new { status = false, msg = "Error in creating delete log blog" });
            }
            return Ok(new { status = true, data = blog, msg = "Delete blog successfully" });
        }

        
    }
}
