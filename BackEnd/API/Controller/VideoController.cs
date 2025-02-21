﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using Application;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : KLNBaseController
    {
        private readonly IVideoService _videoService;
        //private readonly ILogVideoService logVideoService;
        private readonly IVideoValidator _videoValidator;
        public VideoController(IVideoService videoService, IVideoValidator videoValidator)
        {
            _videoService = videoService;
            _videoValidator = videoValidator;
        }
        // GET: api/Video
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<IEnumerable<GetVideoResponse>>))]
        public async Task<IActionResult> GetAllVideos([FromQuery] GetVideoRequest input)
        {
            var videos = await _videoService.GetAllVideosAsync(input);
            return ApiSuccess(videos);
        }
        // GET: api/Video/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetVideoResponse>))]
        public async Task<IActionResult> GetVideoById(Guid id)
        {
            var video = await _videoService.GetVideoByIdAsync(id);
            return ApiSuccess(video);
        }
    }
}
