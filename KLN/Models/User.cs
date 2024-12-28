using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        [Required]
        [Column("userId", TypeName="varchar")]
        public required string userId { get; set; }

        [Column("name", TypeName ="nvarchar")]
        public string? name { get; set; } = string.Empty;

        [Column("email", TypeName ="varchar")]
        public string? email { get; set; } = string.Empty;

        [Column("accountId", TypeName ="varchar")]
        public string? accountId { get; set; } = string.Empty;

        [ForeignKey("accountId")]
        public virtual Account? account { get; set; }

        // blog 1 - n
        [NotMapped]
        public virtual ICollection<Blog>? blogs { get; set; }

        // log blog 1 - n
        [NotMapped]
        public virtual ICollection<LogBlog>? logBlogs { get; set; }

        // book 1 - n
        [NotMapped]
        public virtual ICollection<Book>? books { get; set; }

        // log book 1 - n
        [NotMapped]
        public virtual ICollection<LogBook>? logBooks { get; set; }

        // magazine 1 - n
        [NotMapped]
        public virtual ICollection<Magazine>? magazines { get; set; }

        // log magazine 1 - n
        [NotMapped]
        public virtual ICollection<LogMagazine>? logMagazines { get; set; }

        // video 1 - n
        [NotMapped]
        public virtual ICollection<Video>? videos { get; set; }

        // log video 1 - n
        [NotMapped]
        public virtual ICollection<LogVideo>? logVideos { get; set; }

        // music 1 - n
        [NotMapped]
        public virtual ICollection<Music>? musics { get; set; }

        // log music 1 - n
        [NotMapped]
        public virtual ICollection<LogMusic>? logMusic { get; set; }

        // solem visit 1 - n
        [NotMapped]
        public virtual ICollection<SolemnVisit>? solemVisit { get; set; }

        // log solemVisit 1 - n
        [NotMapped]
        public virtual ICollection<LogSolemVisit>? logSolemVisit { get; set; }

        // slide show 1 - n
        public virtual ICollection<SlideShow>? slideShows { get; set; }

        // log slide show 1 - n
        public virtual ICollection<LogSlideShow>? logSlideShow {  get; set; }

    }
}
