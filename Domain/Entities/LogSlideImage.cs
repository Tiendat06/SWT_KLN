using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("LogSlideImage")]
    public class LogSlideImage
    {
        [Key]
        [Required]
        [Column("logSlideImageId", TypeName ="int")]
        public required int? logSlideImageId { get; set; }

        [Column("logSlideShowId", TypeName = "int")]
        public int? logSlideShowId { get; set; } = -1;

        [Column("imageLink", TypeName ="varchar")]
        public string? imageLink { get; set; } = string.Empty;

        [Column("capture", TypeName = "varchar")]
        public string? capture { get; set; } = string.Empty;

        [ForeignKey("logSlideShowId")]
        public virtual LogSlideShow? logSlideShow { get; set; }
    }
}
