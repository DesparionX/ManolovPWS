namespace MyWebSite.Server.Http.Requests
{
    public class RegisterUserRequest
    {
        public string UserName { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
    }
}
