using KLN.Config;
using KLN.Repository;
using KLN.Services;
using Microsoft.EntityFrameworkCore;
using Scrutor;
var builder = WebApplication.CreateBuilder(args);
var FE_URL = builder.Configuration["FE_URL"] ?? "http://localhost:5000";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins(FE_URL)
        .AllowCredentials()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
// Dependency Injection
// Add services to the container.

builder.Services.AddDbContext<DatabaseManager>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<UserService>();

// Repository
builder.Services.AddScoped<UserRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
