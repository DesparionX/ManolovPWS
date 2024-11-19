using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyWebSite.Server.Data.Entities;

namespace MyWebSite.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public override DbSet<User> Users => Set<User>();
        public DbSet<CV> CVs => Set<CV>();
        public DbSet<Post> Posts => Set<Post>();
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<WorkExperience> WorkExperience { get; set; }
        public DbSet<Education> Education { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Certificate> Certificates { get; set; }

        public DbSet<Message> Messages { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(b =>
            {

                b.ToTable("Users");
                b.HasKey(u => u.Id);

            });

            builder.Entity<Post>(p =>
            {
                p.ToTable("Posts");
                p.HasKey(p => p.Id);
            });

            builder.Entity<CV>(b =>
            {
                b.ToTable("CVs");
                b.HasKey(c => c.Id);

            });
            builder.Entity<Contact>(c =>
            {
                c.ToTable("Contacts");
                c.HasKey(c => c.Id);
            });
            builder.Entity<WorkExperience>(w =>
            {
                w.ToTable("WorkExperience");
                w.HasKey(c => c.Id);
            });
            builder.Entity<Education>(e =>
            {
                e.ToTable("Education");
                e.HasKey(c => c.Id);
            });
            builder.Entity<Skill>(s =>
            {
                s.ToTable("Skills");
                s.HasKey(c => c.Id);
            });
            builder.Entity<Language>(l =>
            {
                l.ToTable("Languages");
                l.HasKey(c => c.Id);
            });
            builder.Entity<Certificate>(c =>
            {
                c.ToTable("Certificates");
                c.HasKey(c => c.Id);
            });

            builder.Entity<IdentityRole>(b =>
            {
                b.ToTable("Roles");
            });

            builder.Entity<IdentityUserClaim<string>>(b =>
            {
                b.ToTable("UserClaims");
            });

            builder.Entity<IdentityUserLogin<string>>(b =>
            {
                b.ToTable("UserLogins");
            });

            builder.Entity<IdentityUserToken<string>>(b =>
            {
                b.ToTable("UserTokens");
            });

            builder.Entity<IdentityUserRole<string>>(b =>
            {
                b.ToTable("UserRoles");
            });

            builder.Entity<IdentityRoleClaim<string>>(b =>
            {
                b.ToTable("RoleClaims");
            });
        }
    }
}
