using API.Controller.Base;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : KLNBaseController
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) 
        { 
            _userService = userService;
        }

        //[HttpGet("v1")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(APIResponse<List<User>>))]
        //public IActionResult getUsersList()
        //{
        //    var usersList = _userService.getAllUsers();
        //    return Ok(new
        //    {
        //        status = true,
        //        data = usersList,
        //        msg = "Load user successfully",
        //    });
        //}
    }
}
