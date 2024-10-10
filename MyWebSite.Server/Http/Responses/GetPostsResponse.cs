using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.ReadModels;

namespace MyWebSite.Server.Http.Responses
{
    public class GetPostsResponse
    {
        public bool Succeeded { get; set; }
        public string? Message { get; set; }
        public ICollection<PostRM>? Posts { get; set; }
    }
}
