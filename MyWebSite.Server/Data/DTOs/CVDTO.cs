using MyWebSite.Server.Data.Entities;

namespace MyWebSite.Server.Data.DTOs
{
    public class CVDTO
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
        public List<ContactDTO>? Contacts { get; set; }
        public List<SkillDTO>? Skills { get; set; }
        public List<WorkExperienceDTO>? WorkExperience { get; set; }
        public List<EducationDTO>? Education { get; set; }
        public List<LanguageDTO>? Languages { get; set; }
        public List<CertificateDTO>? Certificates { get; set; }
    }
}
