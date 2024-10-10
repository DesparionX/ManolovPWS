using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyWebSite.Server.Handlers;

namespace MyWebSite.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CVController : ControllerBase
    {
        private readonly CVHandler _cvHandler;

        public CVController(CVHandler cvHandler)
        {
            _cvHandler = cvHandler;
        }

        [HttpGet("cv")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> LoadCV()
        {
            var result = await _cvHandler.LoadCVAsync();
            if (result.Succeed)
                return Ok(result);

            return BadRequest(result);
        }
    }
}
