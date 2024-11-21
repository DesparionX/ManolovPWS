using MyWebSite.Server.Data.Entities;

namespace MyWebSite.Server.Http.Requests
{
    public class LoginUserRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
