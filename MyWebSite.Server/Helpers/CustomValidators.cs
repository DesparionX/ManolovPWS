using MyWebSite.Server.Http.Requests;

namespace MyWebSite.Server.Helpers
{
    public static class CustomValidators
    {
        public static bool DeletePostRequest(DeleteRequest request)
        {
            if (!string.IsNullOrEmpty(request.PostId) || request.PostType.ToLower() == "post" || request.PostType.ToLower() == "project")
                return true;

            return false;
        }
    }
}
