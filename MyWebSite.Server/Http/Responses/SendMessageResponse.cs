using MyWebSite.Server.Data.DTOs;

namespace MyWebSite.Server.Http.Responses
{
    public class SendMessageResponse
    {
        public bool Succeed { get; set; }
        public bool? HasPenalty { get; set; }
        public string Message { get; set; }
    }
}
