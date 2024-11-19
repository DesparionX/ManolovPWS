using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Data.Entities;

namespace MyWebSite.Server.Http.Responses
{
    public class UpdateCVResponse
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public CVDTO? CV { get; set; }
    }
}
