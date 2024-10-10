using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Server.Data.DTOs
{
    public class PostDTO
    {
        public string Id { get; set; }
        [Required]
        [MaxLength(40, ErrorMessage = "Title too long. Maximum 40 characters.")]
        [MinLength(3, ErrorMessage = "Title too short. Minimum 3 characters.")]
        public string Title { get; set; }

        [Required]
        [MaxLength(2000, ErrorMessage = "Description too long. Maximum 2000 characters.")]
        [MinLength(10, ErrorMessage = "Description too short. Minimum 10 characters.")]
        public string Description { get; set; }
        public string Type { get; set; }

        public List<string>? Pictures { get; set; }
        public string? Link { get; set; }
        public string? ProjectType { get; set; }
    }
}
