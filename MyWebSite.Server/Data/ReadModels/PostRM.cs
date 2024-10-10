using AutoMapper;
using MyWebSite.Server.Data.Entities;
using System.CodeDom;

namespace MyWebSite.Server.Data.ReadModels
{
    public class PostRM
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string? ProjectType { get; set; }
        public string Description { get; set; }
        public List<string>? Pictures { get; set; }
        public string? Link { get; set; }

    }
    
}
