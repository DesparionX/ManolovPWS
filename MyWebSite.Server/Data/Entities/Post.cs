using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Server.Data.Entities
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }
        public required string Type { get; set; }
        public required string ProjectType { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required List<string> Pictures { get; set; }
        public required string Link { get; set; }
        public DateTime DatePosted { get; set; }
    }
}
