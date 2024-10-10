using MyWebSite.Server.Data.ReadModels;

namespace MyWebSite.Server.Http.Responses
{
    public class FindPostResponse
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public PostRM Post { get; set; }
    }
}
