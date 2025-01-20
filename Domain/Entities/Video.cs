using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Video")]
    public class Video
    {
        [Key]
        [Required]
        [Column("videoId", TypeName ="varchar")]
        public required string? videoId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? image { get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("imageLink", TypeName = "varchar")]
        public string? imageLink { get; set; } = string.Empty;

        [Column("videoLink", TypeName = "varchar")]
        public string? videoLink {  get; set; } = string.Empty;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        [NotMapped]
        // log video: 1 - 1
        public virtual ICollection<LogVideo>? logVideo { get; set; }
    }
}
