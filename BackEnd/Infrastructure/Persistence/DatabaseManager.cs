using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class DatabaseManager : DbContext
    {
        public DatabaseManager(DbContextOptions<DatabaseManager> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<LogBlog> LogBlogs { get; set; }
        public DbSet<LogBook> LogBooks { get; set; }
        public DbSet<LogMagazine> LogMagazines { get; set; }
        public DbSet<LogMusic> LogMusics { get; set; }
        //public DbSet<LogSlideImage> LogSlideImages { get; set; }
        public DbSet<LogSlideShow> LogSlideShows { get; set; }
        public DbSet<LogSolemVisit> LogSolemVisits { get; set; }
        public DbSet<LogVideo> LogVideos { get; set; }
        public DbSet<Magazine> Magazines { get; set; }
        public DbSet<Music> Musics { get; set; }
        public DbSet<Role> Roles { get; set; }
        //public DbSet<SlideImage> SlideImages { get; set; }
        public DbSet<SlideShow> SlideShows { get; set; }
        public DbSet<SolemnVisit> SolemnVisits { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Topic> Topics { get; set; }
        //public DbSet<TopicMedia> TopicMedias { get; set; }
        public DbSet<LogTopic> LogTopics { get; set; }
        public DbSet<MediaType> MediaTypes { get; set; }
        public DbSet<SlideShowType> SlideShowTypes { get; set; }
        //public DbSet<LogTopicMedia> LogTopicMedias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");
        }
    }
}
