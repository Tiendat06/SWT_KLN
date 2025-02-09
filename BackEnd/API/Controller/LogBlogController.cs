using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogBlogController : KLNBaseController
    {
        private readonly ILogBlogService _logBlogService;

        public LogBlogController(ILogBlogService logBlogService)
        {
            _logBlogService = logBlogService;
        }

        // GET: api/LogBlog
        //[HttpGet]
        //public async Task<IActionResult> GetLogBlogs()
        //{
        //    var logBlogs = await _logBlogService.GetAllLogBlogsAsync();
        //    return ApiSuccess(logBlogs);
        //}

        // GET: api/LogBlog/5
        //[HttpGet("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LogBlog))]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> GetLogBlog(int id)
        //{
        //var logBlog = await _logBlogService.GetLogBlogByIdAsync(id);
        //if (logBlog == null)
        //{
        //    return NotFound(new { status = false, msg = "Log Blog not found" });
        //}
        //return Ok(new { status = true, data = logBlog, msg = "Load log Blog successfully" });
        //}

        // GET: api/LogBlog/Blog/{BlogId}
        //[HttpGet("Blog/{BlogId}")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LogBlog))]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> GetLogBlogByBlogId(string BlogId)
        //{
        //var logBlog = await _logBlogService.GetLogBlogByBlogIdAsync(BlogId);
        //if (logBlog == null)
        //{
        //    return NotFound(new { status = false, msg = "Log Blog not found for the specified BlogId" });
        //}
        //return Ok(new { status = true, data = logBlog, msg = "Load log Blog successfully" });
        //}

        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LogBlog))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<IActionResult> CreateLog(/*LogBlog logBlog*/)
        //{
        //var result = await _logBlogService.CreateLogBlogAsync(logBlog);
        //if (result == null)
        //{
        //    return BadRequest(new { status = false, msg = "Log Blog can not created" });
        //}
        //return Ok(new
        //{
        //    status = true,
        //    data = logBlog,
        //    msg = "Log created successfully",
        //});
        //}

        //[HttpDelete("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> DeleteBook(int id)
        //{
        //var logBlog = await _logBlogService.DeleteLogBlogAsync(id);
        //if (logBlog == false)
        //{
        //    return NotFound(new { status = false, msg = "Log Blog not found" });
        //}
        //return Ok(new { status = true, data = logBlog, msg = "Delete Log Blog successfully" });
        //}
    }
}
