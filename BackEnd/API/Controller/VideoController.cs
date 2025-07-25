﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.Validators;
using Application;
using System.Net;
using KLN.Shared.CrossCuttingConcerns;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController(
        IVideoService _videoService,
        IVideoValidator _videoValidator
        ) : KLNBaseController
    {
        // GET: api/Video
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<PaginationResponseDto<GetVideoResponse>>))]
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

        // POST: api/Video
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetVideoResponse>))]
        public async Task<IActionResult> CreateVideo([FromForm] AddVideoRequest addVideoRequest)
        {
            var videos = await _videoValidator.CreateVideoAsyncValidator(addVideoRequest);
            return ApiSuccess(videos, HttpStatusCode.Created);
        }

        // PUT: api/Video/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetVideoResponse>))]
        public async Task<IActionResult> PutVideo(Guid id, [FromForm] UpdateVideoRequest updateVideoRequest)
        {
            var updatedVideo = await _videoValidator.UpdateVideoAsyncValidator(id, updateVideoRequest);

            return ApiSuccess(updatedVideo);
        }

        // DELETE: api/Video/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteVideo(Guid id)
        //{
        //    var isDeleted = await _videoService.DeleteVideoAsync(id);

        //    return ApiSuccess(isDeleted);
        //}

        [HttpGet("total")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetTotalVideoResponse>))]
        public async Task<IActionResult> GetTotalVideoAsync([FromQuery] GetTotalVideoRequest input)
        {
            var result = await _videoService.GetTotalVideoAsync(input);
            return ApiSuccess(result);
        }

        // DELETE: api/Video/ids
        [HttpDelete("ids")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<bool>))]
        public async Task<IActionResult> DeleteMultipleVideo([FromBody] List<Guid> ids)
        {
            var result = await _videoService.DeleteMultipleVideoAsync(ids);
            return ApiSuccess(result);
        }
    }
}
