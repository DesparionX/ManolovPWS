using Microsoft.EntityFrameworkCore;
using MyWebSite.Server.Data;
using MyWebSite.Server.Http.Responses;

namespace MyWebSite.Server.Handlers
{
    public class CVHandler
    {
        private readonly ApplicationDbContext _context;

        public CVHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<LoadCVResponse> LoadCVAsync()
        {
            try
            {
                var cv = await _context.CVs.SingleOrDefaultAsync();
                if (cv == null)
                    return new LoadCVResponse { Succeed = false, Message = "No CV found !" };

                return new LoadCVResponse { Succeed = true, Message = "CV found !", CV = cv };
            }
            catch (Exception err)
            {
                return new LoadCVResponse { Succeed = false, Message = err.Message };
            }
        }
    }
}
