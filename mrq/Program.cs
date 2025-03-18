using Microsoft.EntityFrameworkCore;
using mrq.Models;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Regisztráljuk az adatbázis kapcsolatot DI-hoz
builder.Services.AddDbContext<WebstoreContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));

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
app.UseAuthorization();
app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI();

app.Run();
