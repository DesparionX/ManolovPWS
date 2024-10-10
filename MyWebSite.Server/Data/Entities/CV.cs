using Microsoft.CodeAnalysis.Host;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace MyWebSite.Server.Data.Entities
{
    public class CV
    {
        public Guid Id { get; set; }
        public required string FullName { get; set; }
        public bool IsMale { get; set; }
        public required string Nationality { get; set; }
        public required DateTime BirthDate { get; set; }
        public required string AddressJson { get; set; }
        public required string ContactsJson { get; set; }
        public required string SkillsJson { get; set; }
        public required ICollection<WorkExperience> WorkExperience { get; set; }
        public required ICollection<Education> Education { get; set; }
        public required ICollection<Language> Languages { get; set; }
        public ICollection<Certificate>? Certificates { get; set; }

        [NotMapped]
        public Dictionary<string, Dictionary<string, int>> Skills
        {
            get => SkillsJson == null ? null : JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, int>>>(SkillsJson);
            set => SkillsJson = JsonSerializer.Serialize(value);
        }
        [NotMapped]
        public required Dictionary<string, string> Address
        {
            get => AddressJson == null ? null : JsonSerializer.Deserialize<Dictionary<string, string>>(AddressJson);
            set => AddressJson = JsonSerializer.Serialize(value);
        }
        [NotMapped]
        public required Dictionary<string, string> Contacts
        {
            get => ContactsJson == null ? null : JsonSerializer.Deserialize<Dictionary<string, string>>(ContactsJson);
            set => ContactsJson = JsonSerializer.Serialize(value);
        }
    }
}
