using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Handlers;
using MyWebSite.Server.Http.Responses;

namespace MyWebSite.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly MessagesHandler _messagesHandler;

        public MessagesController(MessagesHandler messagesHandler)
        {
            _messagesHandler = messagesHandler;
        }

        [HttpPost("sendMessage")]
        [ProducesResponseType<SendMessageResponse>(200)]
        [ProducesResponseType<SendMessageResponse>(400)]
        [ProducesResponseType<SendMessageResponse>(401)]
        [ProducesResponseType<SendMessageResponse>(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> SendMessege([FromBody] MessageDTO dto)
        {
            var response = await _messagesHandler.SendMessageAsync(HttpContext, dto);
            if (response.Succeed)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("getAllMessages")]
        [ProducesResponseType<GetMessagesResponse>(200)]
        [ProducesResponseType<GetMessagesResponse>(400)]
        [ProducesResponseType<GetMessagesResponse>(401)]
        [ProducesResponseType<GetMessagesResponse>(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllMessages()
        {
            var response = await _messagesHandler.GetAllMessagesAsync();
            if (response.Succeed)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("readMessage")]
        [ProducesResponseType<ReadMessageResponse>(200)]
        [ProducesResponseType<ReadMessageResponse>(400)]
        [ProducesResponseType<ReadMessageResponse>(401)]
        [ProducesResponseType<ReadMessageResponse>(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> ReadMessage([FromQuery] Guid id)
        {
            var response = await _messagesHandler.ReadMessageAsync(id);
            if (response.Succeed)
                return Ok(response);

            return BadRequest(response);
        }

        [HttpDelete("deleteMessage")]
        [ProducesResponseType<DeleteMessageResponse>(200)]
        [ProducesResponseType<DeleteMessageResponse>(400)]
        [ProducesResponseType<DeleteMessageResponse>(401)]
        [ProducesResponseType<DeleteMessageResponse>(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> DeleteMessage([FromQuery] Guid id)
        {
            var response = await _messagesHandler.DeleteMessageAsync(id);
            if (response.Succeed)
                return Ok(response);

            return BadRequest(response);
        }
    }
}
