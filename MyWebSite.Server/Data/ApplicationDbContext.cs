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
                b.Property(c => c.AddressJson).HasColumnName("AddressJson");
                b.Property(c => c.ContactsJson).HasColumnName("ContactsJson");
                b.Property(c => c.SkillsJson).HasColumnName("SkillsJson");

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
