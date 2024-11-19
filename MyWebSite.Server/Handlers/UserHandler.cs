using Microsoft.AspNetCore.Identity;
using MyWebSite.Server.Data;
using MyWebSite.Server.Data.Entities;

namespace MyWebSite.Server.Handlers
{
    public class UserHandler
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserHandler(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        
    }
}
