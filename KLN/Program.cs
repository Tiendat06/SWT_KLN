using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using Application.Interfaces;
using Application.Services;
using Infrastructure.Repositories;
using Domain;
using Infrastructure;
using Application.Exceptions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Application.Validators;
using DotNetEnv;
using CloudinaryDotNet;
using Microsoft.Extensions.Localization;
using Domain.Localization;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
Env.Load();
// add .env to project
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

var FE_URL = builder.Configuration["FE_URL"] ?? "http://localhost:5000";

// add cors
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

// add localization
builder.Services.AddSingleton<IStringLocalizerFactory>(provider =>
new KLNResourcesLocalizerFactory(Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "BackEnd", "Domain", "Localization", "Resources"))));

builder.Services.AddLocalization(options => 
options.ResourcesPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "BackEnd", "Domain", "Localization", "Resources")));

// Dependency Injection
// Add services to the container.
// Cloudinary
Cloudinary cloudinary = new Cloudinary($"cloudinary://{builder.Configuration["API_KEY"]}:{builder.Configuration["API_KEY_SECRET"]}@dydpf7z8u");
cloudinary.Api.Secure = true;
builder.Services.AddSingleton(cloudinary);

builder.Services.AddDbContext<DatabaseManager>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// UnitOfWork
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Validator
builder.Services.AddScoped<IBlogValidator, BlogValidator>();
builder.Services.AddScoped<IBookValidator, BookValidator>();
builder.Services.AddScoped<IMagazineValidator, MagazineValidator>();
builder.Services.AddScoped<ISlideShowValidator, SlideShowValidator>();
builder.Services.AddScoped<ISlideImageValidator, SlideImageValidator>();
builder.Services.AddScoped<ISolemnVisitValidator, SolemnVisitValidator>();
builder.Services.AddScoped<IMusicValidator, MusicValidator>();
builder.Services.AddScoped<IVideoValidator, VideoValidator>();
builder.Services.AddScoped<ITopicValidator, TopicValidator>();

// Repository
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IBlogRepository, BlogRepository>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IMagazineRepository, MagazineRepository>();
builder.Services.AddScoped<ILogBlogRepository, LogBlogRepository>();
builder.Services.AddScoped<ILogBookRepository, LogBookRepository>();
builder.Services.AddScoped<ILogMagazineRepository, LogMagazineRepository>();
builder.Services.AddScoped<ISlideShowRepository, SlideShowRepository>();
//builder.Services.AddScoped<ILogSlideShowRepository, LogSlideShowRepository>();
builder.Services.AddScoped<ISlideImageRepository, SlideImageRepository>();
//builder.Services.AddScoped<ILogSlideImageRepository, LogSlideImageRepository>();
builder.Services.AddScoped<ISolemnVisitRepository, SolemnVisitRepository>();
//builder.Services.AddScoped<ILogSolemnVisitRepository, LogSolemnVisitRepository>();
builder.Services.AddScoped<IVideoRepository, VideoRepository>();
builder.Services.AddScoped<IMusicRepository, MusicRepository>();
builder.Services.AddScoped<ITopicRepository, TopicRepository>();
//builder.Services.AddScoped<ITopicMediaRepository, TopicMediaRepository>();

// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IMagazineService, MagazineService>();
builder.Services.AddScoped<ILogBlogService, LogBlogService>();
builder.Services.AddScoped<ILogBookService, LogBookService>();
builder.Services.AddScoped<ILogMagazineService, LogMagazineService>();
builder.Services.AddScoped<ISlideShowService, SlideShowService>();
builder.Services.AddScoped<ISlideImageService, SlideImageService>();
builder.Services.AddScoped<ISolemnVisitService, SolemnVisitService>();
builder.Services.AddScoped<IVideoService, VideoService>();
builder.Services.AddScoped<IMusicService, MusicService>();
builder.Services.AddScoped<ITopicService, TopicService>();
//builder.Services.AddScoped<ITopicMediaService, TopicMediaService>();

builder.Services.AddControllers(options => 
{
    options.Filters.Add<ExceptionApiResult>();
});

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true; // turn off auto validation
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
// add http context 
builder.Services.AddHttpContextAccessor();

// add jwt in cookie
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddCookie(x =>
{
    x.Cookie.Name = "token";
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT_KEY_SECRET"])),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
    x.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["token"];
            return Task.CompletedTask;
        }
    };
});

// localization options
var supportedCultures = new[] { "vi", "en" };
var localizationOptions = new RequestLocalizationOptions()
{
    DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("vi"),
    SupportedCultures = supportedCultures.Select(c => new System.Globalization.CultureInfo(c)).ToList(),
    SupportedUICultures = supportedCultures.Select(c => new System.Globalization.CultureInfo(c)).ToList(),   
};

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

app.UseRequestLocalization(localizationOptions);

app.MapControllers();

app.Run();
