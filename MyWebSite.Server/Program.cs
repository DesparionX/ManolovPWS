using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyWebSite.Server.Data;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Handlers;
using MyWebSite.Server.Health;
using MyWebSite.Server.Helpers;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
var apiUrl = $"https://{Environment.GetEnvironmentVariable("AZURE_WEB_API") ?? "localhost"}";
var connectionString = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTION") ?? config.GetConnectionString("DefaultConnection");
var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");


config.AddUserSecrets<Program>();

// Add services to the container.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtConfig.JwtKey)),
            ValidIssuer = JwtConfig.JwtIssuer,
            ValidAudience = JwtConfig.JwtAudience,
            ValidateIssuer = true,
            ValidateAudience = true,
            ClockSkew = TimeSpan.Zero,
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.DescribeAllParametersInCamelCase();
    options.AddServer(new OpenApiServer
    {
        Description = "Development Server",
        Url = apiUrl
    });
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Manolov API", Version = "v1" });
    options.CustomOperationIds(e =>
    {
        return e.TryGetMethodInfo(out MethodInfo methodInfo) ? methodInfo.Name : null;
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});
//builder.WebHost.UseKestrel(options =>
//{
//    options.ListenAnyIP(7015);

//});

// Add database.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString, builder =>
    {
        builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
        builder.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
    });
    options.EnableSensitiveDataLogging();
});

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequiredUniqueChars = 0;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireLowercase = false;

    options.User.RequireUniqueEmail = true;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.";
    options.SignIn.RequireConfirmedEmail = false;

})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Custom services
builder.Services.AddAutoMapper(typeof(MapHandler));
builder.Services.AddScoped<ApplicationDbContext>();
builder.Services.AddScoped<PostsHandler>();
builder.Services.AddScoped<CVHandler>();
builder.Services.AddScoped<FileHandler>();
builder.Services.AddScoped<MessagesHandler>();
builder.Services.AddScoped<UserHandler>();
builder.Services.AddScoped<AuthHandler>();
builder.Services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>("custom-check", HealthStatus.Healthy);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors(builder => builder
.WithOrigins("https://manolov.netlify.app")
.AllowAnyMethod()
.AllowAnyHeader()
);

app.UseDefaultFiles();
app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}


app.MapHealthChecks("/health");

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Resources", "Images")),
    RequestPath = "/Resources/Images"
});

app.MapControllers();

app.MapFallbackToFile("/index.html");
app.Urls.Add($"http://0.0.0.0:{port}");
await app.RunAsync();
