using Microsoft.IdentityModel.Tokens;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyWebSite.Server.Handlers
{
    public class AuthHandler
    {
        private readonly IConfiguration _configuration;

        public AuthHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> GenerateJWTAsync(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName!)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtConfig.JwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                issuer: JwtConfig.JwtIssuer,
                audience: JwtConfig.JwtAudience,
                claims: claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
