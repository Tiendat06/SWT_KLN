using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application;
using Application.Validators;
using KLN.Shared.CrossCuttingConcerns;
using System.Net;

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
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetTopicResponse>))]
        public async Task<IActionResult> CreateTopic([FromForm] AddTopicRequest addTopicRequest)
        {
            var topic = await _topicValidator.CreateTopicAsyncValidator(addTopicRequest);
            return ApiSuccess(topic, HttpStatusCode.Created);
        }
    }
}