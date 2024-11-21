using MyWebSite.Server.Data.Entities;

namespace MyWebSite.Server.Http.Responses
{
    public class LoginResponse
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public User? User { get; set; }
        public string? JWT { get; set; }
    }
}
