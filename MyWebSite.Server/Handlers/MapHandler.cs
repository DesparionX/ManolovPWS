using AutoMapper;
using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.ReadModels;
using System.Net.Http.Headers;

namespace MyWebSite.Server.Handlers
{
    public class MapHandler : Profile
    {
        public MapHandler()
        {
            CreateMap<Post, PostRM>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()));

            CreateMap<PostDTO, Post>()
                .ForMember(dest => dest.Pictures, opt => opt.Ignore());
        }
    }
}
