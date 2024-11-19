using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.Interfaces;

namespace MyWebSite.Server.Data.DTOs
{
    public class SkillDTO : IEntity
    {
        public Guid Id { get; set; }
        public string? CVId { get; set; }
        public string Type { get; set; }
        public string SkillName { get; set; }
        public int Level { get; set; }
    }
}
