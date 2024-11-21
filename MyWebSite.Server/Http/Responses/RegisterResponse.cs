using MyWebSite.Server.Data.Entities;

namespace MyWebSite.Server.Http.Responses
{
    public class RegisterResponse
    {
        public bool Succedd { get; set; }
        public string Message { get; set; }
        public User? User { get; set; }
    }
}
