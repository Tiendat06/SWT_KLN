using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using Application;

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

    }
}