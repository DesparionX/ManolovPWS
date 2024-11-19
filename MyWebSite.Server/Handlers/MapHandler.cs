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


            CreateMap<Contact, ContactDTO>()
                .ForMember(dest => dest.CVId, opt => opt.MapFrom(src => src.CV!.Id))
                .ReverseMap();

            CreateMap<Skill, SkillDTO>()
                .ForMember(dest => dest.CVId, opt => opt.MapFrom(src => src.CV!.Id))
                .ReverseMap();

            CreateMap<WorkExperience, WorkExperienceDTO>()
                .ForMember(dest => dest.CVId, opt => opt.MapFrom(src => src.CV!.Id))
                .ReverseMap();

            CreateMap<Education, EducationDTO>()
                .ForMember(dest => dest.CVId, opt => opt.MapFrom(src => src.CV!.Id))
                .ReverseMap();

            CreateMap<Language, LanguageDTO>()
                .ForMember(dest => dest.CVId, opt => opt.MapFrom(src => src.CV!.Id))
                .ReverseMap();

            CreateMap<Certificate, CertificateDTO>()
                .ForMember(dest => dest.CVId, opt => opt.MapFrom(src => src.CV!.Id))
                .ReverseMap();

            CreateMap<CV, CVDTO>();
                

            CreateMap<CVDTO, CV>()
                .ForMember(dest => dest.Contacts, opt => opt.Ignore())
                .ForMember(dest => dest.Skills, opt => opt.Ignore())
                .ForMember(dest => dest.WorkExperience, opt => opt.Ignore())
                .ForMember(dest => dest.Education, opt => opt.Ignore())
                .ForMember(dest => dest.Languages, opt => opt.Ignore())
                .ForMember(dest => dest.Certificates, opt => opt.Ignore());

            CreateMap<Message, MessageDTO>().ReverseMap();
        }
    }
}
