using Application.Interfaces;
using Application.Services;
using Application.Validators;
using CloudinaryDotNet;
using Domain;
using Domain.Interfaces;
using Domain.Localization;
using DotNetEnv;
using Infrastructure;
using Infrastructure.Persistence;
using Infrastructure.Repositories;
using KLN.Shared.CrossCuttingConcerns.Exceptions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace KLN
{
    public class KLNHttpApiHostModule
    {
        public void OnBuildingConfiguration(WebApplicationBuilder builder, params object[] data)
        {
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
            app.UseAuthentication();

            app.UseRequestLocalization((RequestLocalizationOptions)data[0]);

            app.MapControllers();

            app.Run();
        }

        public void ControllerConfiguration(WebApplicationBuilder builder)
        {
            builder.Services.AddControllers(options =>
            {
                options.Filters.Add<ExceptionApiResult>();
            });

            builder.Services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true; // turn off auto validation
            });
            // add http context 
            builder.Services.AddHttpContextAccessor();
        }
        public void CorsConfiguration(WebApplicationBuilder builder)
        {
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
        }

        public void EnvConfiguration(WebApplicationBuilder builder)
        {
            var currentEnvironment = builder.Environment.EnvironmentName;
            Env.Load();
            // add .env to project
            builder.Configuration
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{currentEnvironment}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
        }

        public void SwaggerConfiguration(WebApplicationBuilder builder)
        {
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo { Title = "KLN", Version = "v1" });

                x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "token",
                    In = ParameterLocation.Header,
                    Description = "**<p>Bearer (token)</p>**"
                });

                x.AddSecurityRequirement(new OpenApiSecurityRequirement
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
        }

        public RequestLocalizationOptions LocalizationConfiguration(WebApplicationBuilder builder)
        {
            // add localization
            builder.Services.AddSingleton<IStringLocalizerFactory>(provider =>
            new KLNResourcesLocalizerFactory(Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "BackEnd", "Domain", "Localization", "Resources"))));

            builder.Services.AddLocalization(options =>
            options.ResourcesPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "BackEnd", "Domain", "Localization", "Resources")));

            // localization options
            var supportedCultures = new[] { "vi", "en" };
            var localizationOptions = new RequestLocalizationOptions()
            {
                DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("vi"),
                SupportedCultures = supportedCultures.Select(c => new System.Globalization.CultureInfo(c)).ToList(),
                SupportedUICultures = supportedCultures.Select(c => new System.Globalization.CultureInfo(c)).ToList(),
            };
            return localizationOptions;
        }

        public void AuthenticationConfiguration(WebApplicationBuilder builder)
        {
            // add jwt in header
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT_KEY_SECRET"])),
                    ValidateIssuer = false, 
                    ValidateAudience = false,
                };
            });

            // add jwt in cookie
            //builder.Services.AddAuthentication(x =>
            //{
            //    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //    x.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //}).AddCookie(x =>
            //{
            //    x.Cookie.Name = "token";
            //}).AddJwtBearer(x =>
            //{
            //    x.RequireHttpsMetadata = false;
            //    x.SaveToken = true;
            //    x.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT_KEY_SECRET"])),
            //        ValidateIssuer = false,
            //        ValidateAudience = false,
            //    };
            //    x.Events = new JwtBearerEvents
            //    {
            //        OnMessageReceived = context =>
            //        {
            //            context.Token = context.Request.Cookies["token"];
            //            return Task.CompletedTask;
            //        }
            //    };
            //});
            builder.Services.AddAuthorization();
        }

        public void DatabaseConfiguration(WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<DatabaseManager>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        }

        public void RequestConfiguraton(WebApplicationBuilder builder)
        {
            builder.Services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = 5_368_709_120; // 5 GB
            });

            builder.WebHost.ConfigureKestrel(serverOptions =>
            {
                serverOptions.Limits.MaxRequestBodySize = 5_368_709_120; // 5 GB
            });
        }

        public void ScopeConfiguration(WebApplicationBuilder builder)
        {
            // cloudinary
            Cloudinary cloudinary = new Cloudinary($"cloudinary://{builder.Configuration["API_KEY"]}:{builder.Configuration["API_KEY_SECRET"]}@dydpf7z8u");
            cloudinary.Api.Secure = true;
            builder.Services.AddSingleton(cloudinary);

            // UnitOfWork
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

            // Validator
            builder.Services.AddScoped<IBlogValidator, BlogValidator>();
            builder.Services.AddScoped<IBookValidator, BookValidator>();
            builder.Services.AddScoped<IMagazineValidator, MagazineValidator>();
            builder.Services.AddScoped<ISlideShowValidator, SlideShowValidator>();
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
            builder.Services.AddScoped<ISlideShowTypeRepository, SlideShowTypeRepository>();
            builder.Services.AddScoped<ILogSlideShowRepository, LogSlideShowRepository>();
            builder.Services.AddScoped<ISolemnVisitRepository, SolemnVisitRepository>();
            builder.Services.AddScoped<IVideoRepository, VideoRepository>();
            builder.Services.AddScoped<ILogVideoRepository, LogVideoRepository>();
            builder.Services.AddScoped<IMusicRepository, MusicRepository>();
            builder.Services.AddScoped<ILogMusicRepository, LogMusicRepository>();
            builder.Services.AddScoped<ITopicRepository, TopicRepository>();

            // Services
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IBlogService, BlogService>();
            builder.Services.AddScoped<IBookService, BookService>();
            builder.Services.AddScoped<IMagazineService, MagazineService>();
            builder.Services.AddScoped<ILogBlogService, LogBlogService>();
            builder.Services.AddScoped<ILogBookService, LogBookService>();
            builder.Services.AddScoped<ILogMagazineService, LogMagazineService>();
            builder.Services.AddScoped<ISlideShowService, SlideShowService>();
            builder.Services.AddScoped<ISlideShowTypeService, SlideShowTypeService>();
            builder.Services.AddScoped<ISolemnVisitService, SolemnVisitService>();
            builder.Services.AddScoped<IVideoService, VideoService>();
            builder.Services.AddScoped<ILogVideoService, LogVideoService>();
            builder.Services.AddScoped<IMusicService, MusicService>();
            builder.Services.AddScoped<ILogMusicService, LogMusicService>();
            builder.Services.AddScoped<ITopicService, TopicService>();

        }
    }
}
