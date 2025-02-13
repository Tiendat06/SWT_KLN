using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.DTOs.TopicMedia.Output;
using Application.DTOs.Site.Output;
using Application.Validators;
using System.Net;
using Application.DTOs;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicMediaController : KLNBaseController
    {
        private readonly ITopicMediaService _topicMediaService;
        //private readonly ILogTopicMediaService _logTopicMediaService;
        //private readonly ITopicMediaValidator _topicMediaValidator;

        public TopicMediaController(ITopicMediaService topicMediaService)
        {
            _topicMediaService = topicMediaService;
            //_logTopicMediaService = logTopicMediaService;
            //_topicMediaValidator = topicMediaValidator;
        }

        // GET: api/TopicMedia/5?mediaType=image
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<IEnumerable<GetTopicMediaResponse>>))]
        public async Task<IActionResult> GetAllTopicMedias(Guid id, [FromQuery] string mediaType = "all")
        {
            var topicMedias = await _topicMediaService.GetTopicMediaByTopicIdAsync(id, mediaType);
            return ApiSuccess(topicMedias);
        }

    }
}