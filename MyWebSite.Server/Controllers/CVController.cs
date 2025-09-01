using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Handlers;
using MyWebSite.Server.Http.Responses;

namespace MyWebSite.Server.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("[controller]")]
    [ApiController]
    public class CVController : ControllerBase
    {
        private readonly CVHandler _cvHandler;

        public CVController(CVHandler cvHandler)
        {
            _cvHandler = cvHandler;
        }

        [AllowAnonymous]
        [HttpGet("loadCV")]
        [ProducesResponseType<LoadCVResponse>(200)]
        [ProducesResponseType<LoadCVResponse>(400)]
        [ProducesResponseType<LoadCVResponse>(404)]
        [ProducesResponseType<LoadCVResponse>(401)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> LoadCV(CancellationToken cancellationToken)
        {
            var result = await _cvHandler.LoadCVAsync(cancellationToken);
            if (result.Succeed)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpPost("seedCV")]
        [ProducesResponseType<InitializeCVResult>(200)]
        [ProducesResponseType<InitializeCVResult>(400)]
        [ProducesResponseType<InitializeCVResult>(404)]
        [ProducesResponseType<InitializeCVResult>(401)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> SeedCV()
        {
            var result = await _cvHandler.SeedCVAsync();
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
        public async Task<IActionResult> UpdateCV([FromBody] CVDTO cvDTO, CancellationToken cancellationToken)
        {
            var result = await _cvHandler.UpdateCVAsync(cvDTO, cancellationToken);
            if(result.Succeed)
                return Ok(result);

            return BadRequest(result);
        }
    }
}
