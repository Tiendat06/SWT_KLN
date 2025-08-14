using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application;
using Application.Validators;
using KLN.Shared.CrossCuttingConcerns;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController(
        ITopicService _topicService,
        ITopicValidator _topicValidator
        ) : KLNBaseController
    {
        // GET: api/Topic
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<PaginationResponseDto<GetTopicResponse>>))]
        public async Task<IActionResult> GetAllTopics([FromQuery] GetAllTopicRequest input)
        {
            var topics = await _topicService.GetAllTopicsAsync(input);
            return ApiSuccess(topics);
        }

        // GET: api/Topic/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetTopicResponse>))]
        public async Task<IActionResult> GetTopicById(Guid id)
        {
            var topic = await _topicService.GetTopicByIdAsync(id);

            return ApiSuccess(topic);
        }

        // POST: api/Topic
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetTopicResponse>))]
        public async Task<IActionResult> CreateTopic([FromForm] AddTopicRequest addTopicRequest)
        {
            var topic = await _topicValidator.CreateTopicAsyncValidator(addTopicRequest);
            return ApiSuccess(topic, HttpStatusCode.Created);
        }

        // PUT: api/Topic/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetTopicResponse>))]
        public async Task<IActionResult> PutTopic(Guid id, [FromForm] UpdateTopicRequest updateTopicRequest)
        {
            var updatedTopic = await _topicValidator.UpdateTopicAsyncValidator(id, updateTopicRequest);
            return ApiSuccess(updatedTopic);
        }

        //DELETE: api/Topic/ids
        [HttpDelete("ids")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<bool>))]
        public async Task<IActionResult> DeleteTopic([FromForm] List<Guid> ids)
        {
            var result = await _topicService.DeleteMultipleTopicAsync(ids);
            return ApiSuccess(result);
        }

        // POST: api/Topic/Media/5
        [HttpPost("Media")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetTopicMediaResponse>))]
        public async Task<IActionResult> AddTopicMedia([FromForm] AddTopicMediaRequest addTopicMediaRequest)
        {
            var topicMedia = await _topicValidator.AddTopicMediaAsyncValidator(addTopicMediaRequest);
            return ApiSuccess(topicMedia, HttpStatusCode.Created);
        }

        // PUT: api/Topic/Media/5
        [HttpPut("Media")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetTopicMediaResponse>))]
        public async Task<IActionResult> UpdateTopicMedia([FromForm] UpdateTopicMediaRequest updateTopicMediaRequest)
        {
            var updatedTopicMedia = await _topicValidator.UpdateTopicMediaAsyncValidator(updateTopicMediaRequest);
            return ApiSuccess(updatedTopicMedia);
        }

        // DELETE: api/Topic/Media/5
        [HttpDelete("Media")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<bool>))]
        public async Task<IActionResult> DeleteTopicMedia([FromForm] DeleteTopicMediaRequest request)
        {
            var result = await _topicService.DeleteTopicMediaAsync(request);
            return ApiSuccess(result);
        }
    }
}