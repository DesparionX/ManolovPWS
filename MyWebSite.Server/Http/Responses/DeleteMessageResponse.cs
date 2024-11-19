using MyWebSite.Server.Data.DTOs;

namespace MyWebSite.Server.Http.Responses
{
    public class DeleteMessageResponse
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
    }
}
