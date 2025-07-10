using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application;
using API.Controller.Base;
using Application.Validators;
using System.Net;
using KLN.Shared.CrossCuttingConcerns;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController(
        IBlogService _blogService,
        ILogBlogService _logBlogService,
        IBlogValidator _blogValidator
        ) : KLNBaseController
    {
        // GET: api/Blog/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetBlogResponse>))]
        public async Task<IActionResult> GetBlogById(Guid id)
        {
            var blog = await _blogService.GetBlogByIdAsync(id);

            return ApiSuccess(blog);
        }

        // GET: api/Blog
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<PaginationResponseDto<GetBlogResponse>>))]
        public async Task<IActionResult> GetAllBlogs([FromQuery] GetAllBlogRequest input)
        {
            var blogs = await _blogService.GetAllBlogsAsync(input);
            return ApiSuccess(blogs);
        }

        // POST: api/Blog
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetBlogResponse>))]
        public async Task<IActionResult> CreateBlog([FromForm] AddBlogRequest addBlogRequest)
        {
            var blogs = await _blogValidator.CreateBlogAsyncValidator(addBlogRequest);
            return ApiSuccess(blogs, HttpStatusCode.Created);
        }

        // PUT: api/Blog/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetBlogResponse>))]
        public async Task<IActionResult> PutBlog(Guid id, [FromForm] UpdateBlogRequest updateBlogRequest)
        {
            var updatedBlog = await _blogValidator.UpdateBlogAsyncValidator(id, updateBlogRequest);

            return ApiSuccess(updatedBlog);
        }

        // DELETE: api/Blog/ids
        [HttpDelete("ids")]
        public async Task<IActionResult> DeleteBlog([FromForm] List<Guid> ids)
        {
            var isDeleted = await _blogService.DeleteMultipleBlogsAsync(ids);

            return ApiSuccess(isDeleted);
        }
    }
}
