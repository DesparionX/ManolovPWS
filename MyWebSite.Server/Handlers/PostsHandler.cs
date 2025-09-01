using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyWebSite.Server.Data;
using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.ReadModels;
using MyWebSite.Server.Helpers;
using MyWebSite.Server.Http.Requests;
using MyWebSite.Server.Http.Responses;

namespace MyWebSite.Server.Handlers
{
    public class PostsHandler
    {
        private readonly ApplicationDbContext _context;
        private readonly FileHandler _fileHandler;
        private readonly IMapper _mapper;
        public PostsHandler(ApplicationDbContext context, FileHandler fileHandler, IMapper mapper)
        {
            _context = context;
            _fileHandler = fileHandler;
            _mapper = mapper;
        }
        public async Task<FindPostResponse> FindPostByIdAsync(string postId)
        {
            if (string.IsNullOrWhiteSpace(postId))
                return new FindPostResponse
                {
                    Succeed = false,
                    Message = "Post ID is null or empty."
                };
            try
            {
                var postInDb = await _context.Posts.Where(p => p.Id.ToString().Equals(postId)).FirstOrDefaultAsync();
                if (postInDb == null)
                    return new FindPostResponse
                    {
                        Succeed = false,
                        Message = "Couldn't find a post with given id."
                    };

                var postRM = _mapper.Map<PostRM>(postInDb);
                postRM.Pictures = await _fileHandler.ConvertToBase64(postRM.Pictures!);
                return new FindPostResponse
                {
                    Succeed = true,
                    Message = "Post found !",
                    Post = postRM
                };
            }
            catch (Exception err)
            {
                return new FindPostResponse
                {
                    Succeed = false,
                    Message = err.Message
                };
            }
        }
        public async Task<GetPostsResponse> GetPostsByTypeAsync(string postType)
        {
            try
            {
                var posts = await _context.Posts.Where(p => p.Type.Equals(postType)).OrderByDescending(p => p.DatePosted).ToListAsync();
                if (posts.Count > 0)
                {
                    var postsRm = new List<PostRM>();
                    foreach (var post in posts)
                    {
                        var rm = _mapper.Map<PostRM>(post);
                        rm.Pictures = await _fileHandler.ConvertToBase64(rm.Pictures!);
                        postsRm.Add(rm);
                    }
                    return new GetPostsResponse { Succeeded = true, Message = $"{posts.Count} {postType} found.", Posts = postsRm };
                }
                return new GetPostsResponse { Succeeded = false, Message = "No posts were found." };
            }
            catch (Exception err)
            {
                return new GetPostsResponse { Succeeded = false, Message= err.Message };
            }
        }
        public async Task<UpdatePostResponse> UpdatePostAsync(PostDTO post, CancellationToken cancellationToken)
        {
            if (post == null)
                return new UpdatePostResponse { Succeed = false, Message = "Post is null." };

            try
            {
                var postInDb = await _context.Posts.Where(p => p.Id.ToString().Equals(post.Id)).SingleOrDefaultAsync();
                if (postInDb == null)
                    return new UpdatePostResponse { Succeed = false, Message = "No post found with such ID." };

                postInDb = _mapper.Map(post, postInDb);
                postInDb.Pictures = await _fileHandler.ConvertFromBase64(postInDb.Pictures, post.Pictures!, cancellationToken);

                _context.Update(postInDb);

                var result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    var updatedPost = _mapper.Map<PostRM>(postInDb);
                    updatedPost.Pictures = await _fileHandler.ConvertToBase64(updatedPost.Pictures!, cancellationToken);
                    return new UpdatePostResponse { Succeed = true, Message = "Post updated", Post = updatedPost };
                }

                return new UpdatePostResponse { Succeed = false, Message = "Something went wrong while updating the post." };
            }
            catch (Exception err)
            {
                return new UpdatePostResponse { Succeed = true, Message = err.Message };
            }
        }

        public async Task<AddPostResponse> AddPostAsync(PostDTO post, CancellationToken cancellationToken)
        {
            if (post == null)
                return new AddPostResponse { Succeed = false, Message = "Post is null." };

            post.Id = new Guid().ToString();
            try
            {
                var newPost = _mapper.Map<Post>(post);
                newPost.Pictures = await _fileHandler.ConvertFromBase64(null, post.Pictures!, cancellationToken);
                newPost.DatePosted = DateTime.Now;

                _context.Add(newPost);
                var result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    var postRM = _mapper.Map<PostRM>(newPost);
                    postRM.Pictures = await _fileHandler.ConvertToBase64(postRM.Pictures!, cancellationToken);
                    return new AddPostResponse
                    {
                        Succeed = true,
                        Message = $"{newPost.Id} added successfully.",
                        Post = postRM
                    };
                }
                return new AddPostResponse { Succeed = false, Message = "Something went wrong." };
            }
            catch (Exception err)
            {
                return new AddPostResponse { Succeed = false, Message = err.Message };
            }
        }
        public async Task<DeleteResponse> DeletePostAsync(DeleteRequest request)
        {
            if (!CustomValidators.DeletePostRequest(request))
                return new DeleteResponse { Succeed = false, Message = "One or more validation errors." };

            if (!await PostExist(request.PostId))
                return new DeleteResponse { Succeed = false, Message = "Cannot find post with given id." };

            try
            {
                var post = await _context.Posts.Where(p => p.Id.ToString() == request.PostId).SingleAsync();
                _context.Posts.Remove(post);

                var result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    return new DeleteResponse { Succeed = true, Message = "Post deleted sucessfully." };
                }

                return new DeleteResponse { Succeed = false, Message = "Something went wrong while saving changes. " };
            }
            catch (Exception err)
            {
                return new DeleteResponse { Succeed = false, Message = err.Message };
            }
        }

        private async Task<bool> PostExist(string id)
        {
            var post = await _context.Posts.Where(p => p.Id.ToString() == id).FirstOrDefaultAsync();
            return post is not null;
        }
    }
}
