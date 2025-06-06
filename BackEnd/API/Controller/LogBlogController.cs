using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogBlogController : KLNBaseController
    {
        private readonly ILogBlogService _logBlogService;

        public LogBlogController(ILogBlogService logBlogService)
        {
            _logBlogService = logBlogService;
        }
    }
}
