using KLN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KLN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService) 
        { 
            _userService = userService;
        }

        [HttpGet("v1")]
        public IActionResult getUsersList()
        {
            var usersList = _userService.getAllUsers();
            return Ok(new
            {
                status=true,
                data=usersList,
                msg="Load user successfully",
            });
        }
    }
}
