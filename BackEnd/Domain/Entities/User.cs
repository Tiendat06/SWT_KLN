using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("User")]
    public class User
    {
        [Key]
        [Required]
        [Column("userId", TypeName= "uniqueidentifier")]
        public required Guid UserId { get; set; }

        [Column("name", TypeName ="nvarchar")]
        public string? Name { get; set; } = string.Empty;

        [Column("email", TypeName ="varchar")]
        public string? Email { get; set; } = string.Empty;

        [Column("accountId", TypeName ="uniqueidentifier")]
        public Guid? AccountId { get; set; }

        [ForeignKey("AccountId")]
        public virtual Account? Account { get; set; }

        // blog 1 - n
        //[NotMapped]
        public virtual ICollection<Blog>? Blogs { get; set; }

        // log blog 1 - n
        //[NotMapped]
        public virtual ICollection<LogBlog>? LogBlogs { get; set; }

        // book 1 - n
        //[NotMapped]
        public virtual ICollection<Book>? Books { get; set; }

        // log book 1 - n
        //[NotMapped]
        public virtual ICollection<LogBook>? LogBooks { get; set; }

        // magazine 1 - n
        //[NotMapped]
        public virtual ICollection<Magazine>? Magazines { get; set; }

        // log magazine 1 - n
        //[NotMapped]
        public virtual ICollection<LogMagazine>? LogMagazines { get; set; }

        // video 1 - n
        //[NotMapped]
        public virtual ICollection<Video>? Videos { get; set; }

        // log video 1 - n
        //[NotMapped]
        public virtual ICollection<LogVideo>? LogVideos { get; set; }

        // music 1 - n
        //[NotMapped]
        public virtual ICollection<Music>? Musics { get; set; }

        // log music 1 - n
        //[NotMapped]
        public virtual ICollection<LogMusic>? LogMusics { get; set; }

        // solem visit 1 - n
        //[NotMapped]
        public virtual ICollection<SolemnVisit>? SolemVisit { get; set; }

        // log solemVisit 1 - n
        //[NotMapped]
        public virtual ICollection<LogSolemVisit>? LogSolemVisits { get; set; }

        // slide show 1 - n
        //[NotMapped]
        public virtual ICollection<SlideShow>? SlideShows { get; set; }

        // log slide show 1 - n
        //[NotMapped]
        public virtual ICollection<LogSlideShow>? LogSlideShows {  get; set; }

        //[NotMapped]
        public virtual ICollection<Topic>? Topics { get; set; }

        //[NotMapped]
        public virtual ICollection<LogTopic>? LogTopics { get; set; }

    }
}
