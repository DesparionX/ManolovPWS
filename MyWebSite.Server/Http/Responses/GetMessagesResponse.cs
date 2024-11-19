using MyWebSite.Server.Data.DTOs;

namespace MyWebSite.Server.Http.Responses
{
    public class GetMessagesResponse
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public ICollection<MessageDTO>? MessagesList { get; set; }
    }
}
