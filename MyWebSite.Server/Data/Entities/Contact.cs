using MyWebSite.Server.Data.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyWebSite.Server.Data.Entities
{
    public class Contact : IEntity
    {
        [Key]
        public Guid Id { get; set; }
        [JsonIgnore]
        public CV? CV { get; set; }
        public string Domain { get; set; }
        public string Username { get; set; }
    }
}
