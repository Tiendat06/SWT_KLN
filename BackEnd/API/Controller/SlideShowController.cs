using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using Application;
using KLN.Shared.CrossCuttingConcerns;
using System.Net;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideShowController : KLNBaseController
    {
        private readonly ISlideShowService _slideShowService;
        //private readonly ILogSlideShowService logSlideShowService;
        private readonly ISlideShowValidator _slideShowValidator;
        public SlideShowController(ISlideShowService slideShowService, ISlideShowValidator slideShowValidator)
        {
            _slideShowService = slideShowService;
            _slideShowValidator = slideShowValidator;
        }

        // GET: api/SlideShow
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<PaginationResponseDto<GetSlideShowResponse>>))]
        public async Task<IActionResult> GetAllSlideShows([FromQuery] GetSlideShowRequest input)
        {
            var slideShows = await _slideShowService.GetAllSlideShowsAsync(input);
            return ApiSuccess(slideShows);
        }

        // GET: api/SlideShow/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSlideShowResponse>))]
        public async Task<IActionResult> GetSlideShowById(Guid id)
        {
            var slideShow = await _slideShowService.GetSlideShowByIdAsync(id);
            return ApiSuccess(slideShow);
        }

        // POST: api/SlideShow
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetSlideShowResponse>))]
        public async Task<IActionResult> CreateSlideShow([FromForm] AddSlideShowRequest addSlideShowRequest)
        {
            var slideshow = await _slideShowValidator.CreateSlideShowAsyncValidator(addSlideShowRequest);
            return ApiSuccess(slideshow, HttpStatusCode.Created);
        }

        // PUT: api/SlideShow/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSlideShowResponse>))]
        public async Task<IActionResult> PutSlideShow(Guid id, [FromForm] UpdateSlideShowRequest updateSlideShowRequest)
        {
            var updatedSlideShow = await _slideShowValidator.UpdateSlideShowAsyncValidator(id, updateSlideShowRequest);
            return ApiSuccess(updatedSlideShow);
        }

        // DELETE: api/SlideShow/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteSlideShow(Guid id)
        //{
        //    var isDeleted = await _slideShowService.DeleteSlideShowsAsync(id);
        //    return ApiSuccess(isDeleted);
        //}

        // DELETE: api/SlideShow
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<bool>))]
        public async Task<IActionResult> DeleteSlideShows([FromBody] DeleteSlideShowsRequest deleteSlideShowsRequest)
        {
            var isDeleted = await _slideShowService.DeleteSlideShowsAsync(deleteSlideShowsRequest);
            return ApiSuccess(isDeleted);
        }
    }
}