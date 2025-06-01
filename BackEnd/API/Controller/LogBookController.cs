using API.Controller.Base;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogBookController : KLNBaseController
    {
        private readonly ILogBookService _logBookService;

        public LogBookController(ILogBookService logBookService)
        {
            _logBookService = logBookService;
        }
    }
}
