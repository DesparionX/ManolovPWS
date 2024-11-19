using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.Interfaces;

namespace MyWebSite.Server.Data.DTOs
{
    public class WorkExperienceDTO : IEntity
    {
        public Guid Id { get; set; }
        public string? CVId { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
