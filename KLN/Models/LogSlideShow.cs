using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("LogSlideShow")]
    public class LogSlideShow
    {
        [Key]
        [Required]
        [Column("logSlideShowId", TypeName ="int")]
        public required int? logSlideShowId { get; set; }

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? updateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName = "varchar")]
        public string? process { get; set; } = string.Empty;

        [Column("flag", TypeName = "varchar")]
        public string? flag { get; set; } = string.Empty;

        [Column("title", TypeName = "nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? image { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [Column("slideShowId", TypeName ="varchar")]
        public string? slideShowId {  get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        [ForeignKey("slideShowId")]
        public virtual SlideShow? slideShow { get; set; }

        [NotMapped]
        public virtual ICollection<LogSlideImage>? logSlideImages {  get; set; } 
    }
}
