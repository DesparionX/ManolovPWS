using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Handlers;
using MyWebSite.Server.Http.Responses;

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

        [HttpGet("loadCV")]
        [ProducesResponseType<LoadCVResponse>(200)]
        [ProducesResponseType<LoadCVResponse>(400)]
        [ProducesResponseType<LoadCVResponse>(404)]
        [ProducesResponseType<LoadCVResponse>(401)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> LoadCV()
        {
            var result = await _cvHandler.LoadCVAsync();
            if (result.Succeed)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpPost("initializeCV")]
        [ProducesResponseType<InitializeCVResult>(200)]
        [ProducesResponseType<InitializeCVResult>(400)]
        [ProducesResponseType<InitializeCVResult>(404)]
        [ProducesResponseType<InitializeCVResult>(401)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> InitializeCV()
        {
            var result = await _cvHandler.InitializeCV();
            if (result.Succeed)
                return Ok(result);
            return BadRequest(result);
        }

        [HttpPut("updateCV")]
        [ProducesResponseType<UpdateCVResponse>(200)]
        [ProducesResponseType<UpdateCVResponse>(400)]
        [ProducesResponseType<UpdateCVResponse>(404)]
        [ProducesResponseType<UpdateCVResponse>(401)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> UpdateCV([FromBody] CVDTO cvDTO)
        {
            var result = await _cvHandler.UpdateCVAsync(cvDTO);
            if(result.Succeed)
                return Ok(result);

            return BadRequest(result);
        }
    }
}
