namespace MyWebSite.Server.Data.Entities
{
    public class Language
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public int ReadLevel { get; set; }
        public int WriteLevel { get; set; }
        public int TalkLevel { get; set; }

    }
}
