namespace MyWebSite.Server.Data.Entities
{
    public class Education
    {
        public int Id { get; set; }
        public required string SchoolName { get; set; }
        public required string EducationType { get; set; }
        public required string ProfessionAquired { get; set; }
        public string? Description { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
    }
}
