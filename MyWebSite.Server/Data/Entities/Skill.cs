using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MyWebSite.Server.Data.Interfaces;

namespace MyWebSite.Server.Data.Entities
{
    public class Skill : IEntity
    {
        [Key]
        public Guid Id { get; set; }
        [JsonIgnore]
        public CV? CV { get; set; }
        public string Type { get; set; }
        public string SkillName { get; set; }
        public int Level { get; set; }
    }
}
