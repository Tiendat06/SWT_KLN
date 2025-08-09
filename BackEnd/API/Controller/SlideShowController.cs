using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using Application;
using KLN.Shared.CrossCuttingConcerns;
using System.Net;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetSlideShowResponse>))]
        public async Task<IActionResult> CreateSlideShow([FromForm] AddSlideShowRequest addSlideShowRequest)
        {
            var slideshow = await _slideShowValidator.CreateSlideShowAsyncValidator(addSlideShowRequest);
            return ApiSuccess(slideshow, HttpStatusCode.Created);
        }

        // PUT: api/SlideShow/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSlideShowResponse>))]
        public async Task<IActionResult> PutSlideShow(Guid id, [FromForm] UpdateSlideShowRequest updateSlideShowRequest)
        {
            var updatedSlideShow = await _slideShowValidator.UpdateSlideShowAsyncValidator(id, updateSlideShowRequest);
            return ApiSuccess(updatedSlideShow);
        }

        // DELETE: api/SlideShow
        [HttpDelete]
        [Authorize(Roles = "Admin")]
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

        // GET: api/SlideShow/SlideImage/5
        [HttpGet("SlideImage")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSlideImageResponse>))]
        public async Task<IActionResult> GetSlideImageById(Guid slideShowId, int slideImageId)
        {
            var slideImage = await _slideShowService.GetSlideImageByIdAsync(slideShowId, slideImageId);
            return ApiSuccess(slideImage);
        }

        // POST: api/SlideImage
        [HttpPost("SlideImage")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetSlideImageListResponse>))]
        public async Task<IActionResult> AddSlideImage([FromForm] AddSlideImagesRequest addSlideImageRequest)
        {
            var slideImage = await _slideShowValidator.CreateSlideImageAsyncValidator(addSlideImageRequest);
            return ApiSuccess(slideImage, HttpStatusCode.Created);
        }

        // PUT: api/SlideImage/5
        [HttpPut("SlideImage")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSlideImageListResponse>))]
        public async Task<IActionResult> UpdateSlideImage([FromForm] UpdateSlideImagesRequest updateSlideImageRequest)
        {
            var slideImage = await _slideShowValidator.UpdateSlideImageAsyncValidator(updateSlideImageRequest);
            return ApiSuccess(slideImage);
        }

        // DELETE: api/SlideImage/ids
        [HttpDelete("SlideImage")]
        [Authorize(Roles = "Admin")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<bool>))]
        public async Task<IActionResult> DeleteSlideImages([FromBody] DeleteSlideImageRequest deleteSlideImagesRequest)
        {
            var isDeleted = await _slideShowService.DeleteSlideImagesAsync(deleteSlideImagesRequest);
            return ApiSuccess(isDeleted);
        }
    }
}