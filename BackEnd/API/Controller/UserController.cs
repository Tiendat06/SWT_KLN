using API.Controller.Base;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(
        IUserService _userService
        ) : KLNBaseController
    {
    }
}
