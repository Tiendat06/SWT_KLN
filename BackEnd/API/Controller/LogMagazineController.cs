using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogMagazineController : KLNBaseController
    {
        private readonly ILogMagazineService _logMagazineService;

        public LogMagazineController(ILogMagazineService logMagazineService)
        {
            _logMagazineService = logMagazineService;
        }
    }
}
