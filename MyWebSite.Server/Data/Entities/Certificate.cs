using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MyWebSite.Server.Data.Interfaces;

namespace MyWebSite.Server.Data.Entities
{
    public class Certificate : IEntity
    {
        [Key]
        public Guid Id { get; set; }
        [JsonIgnore]
        public CV? CV { get; set; }
        public string Title { get; set; }
        public string Company { get; set; }
        public string Link { get; set; }
    }
}
