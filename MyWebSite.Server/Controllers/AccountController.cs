using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyWebSite.Server.Handlers;
using MyWebSite.Server.Http.Requests;
using MyWebSite.Server.Http.Responses;
using System.Security.Claims;

namespace MyWebSite.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserHandler _userHandler;

        public AccountController(UserHandler userHandler)
        {
            _userHandler = userHandler;
        }


        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType<RegisterResponse>(201)]
        [ProducesResponseType<RegisterResponse>(200)]
        [ProducesResponseType<RegisterResponse>(400)]
        [ProducesResponseType<RegisterResponse>(500)]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
        {
            if (request == null)
                return BadRequest("Request is null.");

            var response = await _userHandler.RegisterUserAsync(request);
            if(response.Succedd)
                return Created("", response);

            return BadRequest(response);
        }

        [HttpPost("logIn")]
        [AllowAnonymous]
        [ProducesResponseType<LoginResponse>(200)]
        [ProducesResponseType<LoginResponse>(400)]
        [ProducesResponseType<LoginResponse>(500)]
        public async Task<IActionResult> LogIn([FromBody] LoginUserRequest request)
        {
            if (request == null)
                return BadRequest("Login request is null.");

            var response = await _userHandler.LoginUserAsync(request);
            if (response.Succeed)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpPost("logOut")]
        [ProducesResponseType<LogOutResponse>(200)]
        [ProducesResponseType<LogOutResponse>(400)]
        [ProducesResponseType<LogOutResponse>(500)]
        public async Task<IActionResult> LogOut()
        {
            var identity = User.Identity as ClaimsIdentity;
            if(identity == null)
                return BadRequest("There is no currently singed in user.");

            var response = await _userHandler.LogOutAsync();
            if (response.Succeed)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
