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
    public class SlideShowController(
        ISlideShowService _slideShowService,
        ISlideShowValidator _slideShowValidator
        ) : KLNBaseController
    {
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

        // DELETE: api/SlideShow
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<bool>))]
        public async Task<IActionResult> DeleteSlideShows([FromBody] DeleteSlideShowsRequest deleteSlideShowsRequest)
        {
            var isDeleted = await _slideShowService.DeleteSlideShowsAsync(deleteSlideShowsRequest);
            return ApiSuccess(isDeleted);
        }

        [HttpGet("total")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetTotalSlideImageResponse>))]
        public async Task<IActionResult> CountTotalSlideImagePerSlideShow([FromQuery] GetSlideShowRequest input)
        {
            var result = await _slideShowService.CountSlideImagePerSlideShowAsync(input);
            return ApiSuccess(result);
        }

        // POST: api/SlideImage
        [HttpPost("SlideImage/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetSlideImageResponse>))]
        public async Task<IActionResult> AddSlideImage([FromForm] AddSlideImageRequest addSlideImageRequest)
        {
            //var addSlideImage = new AddSlideImageRequest
            //{
            //    SlideShowId = addSlideImageRequest.SlideShowId,
            //    MediaTypeId = addSlideImageRequest.MediaTypeId,
            //    SlideShowTypeId = addSlideImageRequest.SlideShowTypeId,
            //    Capture = addSlideImageRequest.Capture,
            //    SlideImage = addSlideImageRequest.SlideImage
            //};
            // Assuming there's a method in the service to handle adding slide images
            await _slideShowService.AddSlideImageAsync(addSlideImageRequest);
            return ApiSuccess(HttpStatusCode.Created, "Slide image added successfully.");
        }

        // PUT: api/SlideImage/5
        [HttpPut("SlideImage/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSlideImageResponse>))]
        public async Task<IActionResult> UpdateSlideImage([FromForm] UpdateSlideImageRequest updateSlideImageRequest)
        {
            // Assuming there's a method in the service to handle updating slide images
            var updatedSlideImage = await _slideShowService.UpdateSlideImageAsync(updateSlideImageRequest);
            return ApiSuccess(updatedSlideImage);
        }

        // DELETE: api/SlideImage/ids
        [HttpDelete("SlideImage/{ids}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<bool>))]
        public async Task<IActionResult> DeleteSlideImages([FromForm] DeleteSlideImageRequest deleteSlideImagesRequest)
        {
            // Assuming there's a method in the service to handle deleting slide images
            var isDeleted = await _slideShowService.DeleteSlideImageAsync(deleteSlideImagesRequest);
            return ApiSuccess(isDeleted);
        }
    }
}