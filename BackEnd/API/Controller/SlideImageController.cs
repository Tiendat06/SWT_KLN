using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.DTOs.SlideImage.Output;
using API.Controller.Base;
using Application.Validators;
using static System.Net.Mime.MediaTypeNames;
using System.Net;
using Application.DTOs.Site.Output;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideImageController : KLNBaseController
    {
        private readonly ISlideImageService _slideImageService;
        //private readonly ILogSlideImageService logSlideImageService;
        //private readonly SlideImageValidator _slideImageValidator;
        public SlideImageController(ISlideImageService slideImageService)
        {
            _slideImageService = slideImageService;
            //_slideImageValidator = slideImageValidator;
        }
        // GET: api/SlideImage
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<IEnumerable<GetSlideImageResponse>>))]
        public async Task<IActionResult> GetAllSlideImages()
        {
            var slideImages = await _slideImageService.GetAllSlideImagesAsync();

            return ApiSuccess(slideImages);
        }
        // GET: api/SlideImage/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetSlideImageResponse>))]
        public async Task<IActionResult> GetSlideImageById(Guid id)
        {
            var slideImage = await _slideImageService.GetSlideImageByIdAsync(id);

            return ApiSuccess(slideImage);
        }

    }
}
