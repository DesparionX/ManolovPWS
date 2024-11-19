using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.Interfaces;

namespace MyWebSite.Server.Data.DTOs
{
    public class CertificateDTO : IEntity
    {
        public Guid Id { get; set; }
        public string? CVId { get; set; }
        public string Title { get; set; }
        public string Company { get; set; }
        public string Link { get; set; }
    }
}
