namespace MyWebSite.Server.Data.Entities
{
    public class Certificate
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Company { get; set; }
        public required string Link { get; set; }
    }
}
