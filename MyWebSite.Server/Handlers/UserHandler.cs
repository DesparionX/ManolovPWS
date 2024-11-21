using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Razor.TagHelpers;
using MyWebSite.Server.Data;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Http.Requests;
using MyWebSite.Server.Http.Responses;
using System.Security.Claims;

namespace MyWebSite.Server.Handlers
{
    public class UserHandler
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly AuthHandler _authHandler;

        public UserHandler(ApplicationDbContext context, UserManager<User> userManager, SignInManager<User> signInManager, AuthHandler authHandler)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _authHandler = authHandler;
        }

        public async Task<RegisterResponse> RegisterUserAsync(RegisterUserRequest request)
        {
            var user = new User
            {
                UserName = request.UserName,
                Email = request.Mail
            };

            try
            {
                var result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    return new RegisterResponse { Succedd = true, Message = "User registered sucessfully.", User = user };
                }
                return new RegisterResponse { Succedd = false, Message = "Something went wrong !" };
            }
            catch (Exception err)
            {
                return new RegisterResponse { Succedd = false, Message = err.Message };
            }
        }
        public async Task<LoginResponse> LoginUserAsync(LoginUserRequest request)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(request.UserName);
                if (user == null)
                    return new LoginResponse { Succeed = false, Message = "User doesn't exist." };


                var res = await _signInManager.PasswordSignInAsync(user, request.Password, isPersistent: true, lockoutOnFailure: false);
                if (res.Succeeded)
                {
                    var token = await _authHandler.GenerateJWTAsync(user);

                    return new LoginResponse { Succeed = true, Message = "User successfully logged in.", User = user, JWT = token };
                }
                return new LoginResponse { Succeed = false, Message = "Incorrect password." };
            }
            catch (Exception err)
            {
                return new LoginResponse { Succeed = false, Message = err.Message };
            }
        }

        public async Task<LogOutResponse> LogOutAsync()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return new LogOutResponse { Succeed = true, Message = "User logged out succesfully." };
            }
            catch (Exception err)
            {
                return new LogOutResponse { Succeed = false, Message = err.Message };
            }
        }

    }
}
