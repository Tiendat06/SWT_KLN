using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("SlideShow")]
    public class SlideShow
    {
        [Key]
        [Required]
        [Column("slideShowId", TypeName ="varchar")]
        public required string? slideShowId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? image { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        [NotMapped]
        public virtual ICollection<LogSlideShow>? logSlideShow {  get; set; }

        [NotMapped]
        public virtual ICollection<SlideImage>? slideImage { get; set; }
    }
}
