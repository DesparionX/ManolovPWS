using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Server.Data.Entities
{
    public class Message
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Sender { get; set; }
        public string Mail { get; set; }
        public string Text { get; set; }
        public string SenderIp { get; set; }
        public string SenderDevice { get; set; }
        public DateTime DateSent { get; set; }
    }
}
