using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Handlers;
using MyWebSite.Server.Http.Requests;
using MyWebSite.Server.Http.Responses;

namespace MyWebSite.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly PostsHandler _postsHandler;

        public PostsController(PostsHandler postsHandler)
        {
            _postsHandler = postsHandler;
        }

        [HttpGet("getPosts"), DisableRequestSizeLimit]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType<GetPostsResponse>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPosts([FromQuery]string postType)
        {
            var result = await _postsHandler.GetPostsByTypeAsync(postType);
            if (result.Succeeded)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpGet("findPost"), DisableRequestSizeLimit]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType<FindPostResponse>(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindPostById([FromQuery]string id)
        {
            if (id == null)
                return BadRequest(new FindPostResponse
                {
                    Succeed = false,
                    Message = ""
                });

            var response = await _postsHandler.FindPostByIdAsync(id);
            if(response.Succeed)
                return Ok(response);

            return BadRequest(response);
        }



        [HttpPut("updatePost")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType<UpdatePostResponse>(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdatePost([FromBody] PostDTO post)
        {
            var response = await _postsHandler.UpdatePostAsync(post);
            if (response.Succeed)
                return Ok(response);
            
            return BadRequest(response);
        }

        [HttpPost("addPost")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType<AddPostResponse>(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddPost([FromBody] PostDTO request)
        {
            var result = await _postsHandler.AddPostAsync(request);
            if (result.Succeed)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpDelete("deletePost")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType<DeleteResponse>(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeletePost([FromBody] DeleteRequest request)
        {
            if (request == null)
                return BadRequest(new DeleteResponse { Succeed = false, Message = "Request is null." });

            var response = await _postsHandler.DeletePostAsync(request);
            if (response.Succeed)
                return Ok(response);
            return BadRequest(response);
        }
    }
}
