using MyWebSite.Server.Data.Entities;

namespace MyWebSite.Server.Http.Responses
{
    public class InitializeCVResult
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public CV CV { get; set; }
    }
}
