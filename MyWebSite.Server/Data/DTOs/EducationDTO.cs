using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.Interfaces;

namespace MyWebSite.Server.Data.DTOs
{
    public class EducationDTO : IEntity
    {
        public Guid Id { get; set; }
        public string? CVId { get; set; }
        public string SchoolName { get; set; }
        public string EducationType { get; set; }
        public string ProfessionAquired { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
