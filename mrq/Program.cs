using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mrq.Models;
using mrq.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Regisztráljuk az adatbázis kapcsolatot DI-hoz
builder.Services.AddDbContext<WebstoreContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));


// 🔹 Regisztráljuk az Identity package szükséges osztályait DI-hoz
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<WebstoreContext>()
          .AddDefaultTokenProviders();

// Kiolvassuk appsettings-ből a szükséges azonosítókat
var settingsSection = builder.Configuration.GetSection("AuthSettings:JwtOptions");
builder.Services.Configure<JwtOptions>(settingsSection);

builder.Services.AddScoped<TokenGenerator>();

// JWT autentikációs szolgáltatásának konfigurálása
var secret = settingsSection.GetValue<string>("Secret");
var issuer = settingsSection.GetValue<string>("Issuer");
var auidience = settingsSection.GetValue<string>("Audience");

var key = Encoding.ASCII.GetBytes(secret);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = issuer,
        ValidAudience = auidience,
        ValidateAudience = true
    };
});

// 🔹 Engedélyezzük a CORS-t, hogy a frontend elérje az API-t
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI();

app.Run();
