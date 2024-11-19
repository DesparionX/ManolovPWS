using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.Interfaces;

namespace MyWebSite.Server.Data.DTOs
{
    public class LanguageDTO : IEntity
    {
        public Guid Id { get; set; }
        public string? CVId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string ReadLevel { get; set; }
        public string WriteLevel { get; set; }
        public string TalkLevel { get; set; }
    }
}
