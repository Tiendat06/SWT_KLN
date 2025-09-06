using API.Controller.Base;
using Application;
using Application.DTOs;
using Application.Interfaces;
using Application.Validators;
using KLN.Shared.CrossCuttingConcerns;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Validators;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(
        IAccountValidator _accountValidator,
        IAccountService _accountService
        ) : KLNBaseController
    {
        // POST api/account/login
        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetLoginResponse>))]
        public async Task<IActionResult> Login([FromForm] LoginRequest loginRequest)
        {
            var result = await _accountValidator.LoginAsyncValidator(loginRequest);
            return ApiSuccess(result);
        }

        // POST api/account/refresh
        [HttpPost("refresh")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetLoginResponse>))]
        public async Task<IActionResult> Refresh([FromForm] string refreshTokenRequest)
        {
            // Validate the refresh token and login again
            var result = await _accountService.RefreshTokenAsync(refreshTokenRequest);
            return ApiSuccess(result);
        }
    }
}
