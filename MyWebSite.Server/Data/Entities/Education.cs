using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MyWebSite.Server.Data.Interfaces;

namespace MyWebSite.Server.Data.Entities
{
    public class Education : IEntity
    {
        [Key]
        public Guid Id { get; set; }
        [JsonIgnore]
        public CV? CV { get; set; }
        public string SchoolName { get; set; }
        public string EducationType { get; set; }
        public string ProfessionAquired { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
