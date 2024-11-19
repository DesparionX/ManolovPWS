using MyWebSite.Server.Data.DTOs;

namespace MyWebSite.Server.Http.Responses
{
    public class ReadMessageResponse
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public MessageDTO? DTO { get; set; }
    }
}
