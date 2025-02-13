using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.DTOs.Topic.Output;
using Application.DTOs.Site.Output;
using Application.Validators;
using System.Net;
using Application.DTOs;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : KLNBaseController
    {
        private readonly ITopicService _topicService;
        //private readonly ILogTopicService _logTopicService;
        //private readonly ITopicValidator _topicValidator;

        public TopicController(ITopicService topicService)
        {
            _topicService = topicService;
            //_logTopicService = logTopicService;
            //_topicValidator = topicValidator;
        }

        // GET: api/Topic
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<IEnumerable<GetTopicResponse>>))]
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
    }
}