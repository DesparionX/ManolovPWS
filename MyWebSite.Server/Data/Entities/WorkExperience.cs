namespace MyWebSite.Server.Data.Entities
{
    public class WorkExperience
    {
        public int Id { get; set; }
        public required string Position { get; set; }
        public required string Description { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
    }
}
