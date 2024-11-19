using Microsoft.CodeAnalysis.Host;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MyWebSite.Server.Data.Entities
{
    public class CV
    {
        public Guid Id { get; set; }
        public string Picture { get; set; }
        public string FullName { get; set; }
        public bool IsMale { get; set; }
        public string Nationality { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string Profession { get; set; }
        public string Description { get; set; }
        public ICollection<Contact>? Contacts { get; set; }
        public ICollection<Skill>? Skills { get; set; }
        public ICollection<WorkExperience>? WorkExperience { get; set; }
        public ICollection<Education>? Education { get; set; }
        public ICollection<Language>? Languages { get; set; }
        public ICollection<Certificate>? Certificates { get; set; }
    }
}
