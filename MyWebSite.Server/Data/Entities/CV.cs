﻿using Microsoft.CodeAnalysis.Host;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

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
        public string AddressJson { get; set; }
        public string ContactsJson { get; set; }
        public string SkillsJson { get; set; }
        public string Profession { get; set; }
        public string Description { get; set; }
        public ICollection<WorkExperience>? WorkExperience { get; set; }
        public ICollection<Education>? Education { get; set; }
        public ICollection<Language>? Languages { get; set; }
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