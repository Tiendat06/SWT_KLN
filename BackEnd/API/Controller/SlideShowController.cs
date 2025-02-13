using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.DTOs.SlideShow.Output;
using API.Controller.Base;
using Application.Validators;
using static System.Net.Mime.MediaTypeNames;
using System.Net;
using Application.DTOs.Site.Output;
using Application.DTOs.SlideShow.Input;

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

        // GET: api/SlideShow/input
        [HttpGet("input")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<IEnumerable<GetSlideShowResponse>>))]
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