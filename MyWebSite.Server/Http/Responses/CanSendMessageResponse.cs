namespace MyWebSite.Server.Http.Responses
{
    public class CanSendMessageResponse
    {
        public bool Succeed { get; set; }
        public bool Can { get; set; }
        public string? Message { get; set; }
    }
}
