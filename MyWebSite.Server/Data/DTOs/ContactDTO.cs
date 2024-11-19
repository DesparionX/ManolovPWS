using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Server.Data.DTOs
{
    public class ContactDTO : IEntity
    {
        public Guid Id { get; set; }
        public string? CVId { get; set; }
        public string Domain { get; set; }
        public string Username { get; set; }
    }
}
