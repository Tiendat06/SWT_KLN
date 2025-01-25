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
        public required int? LogSlideImageId { get; set; }

        [Column("logSlideShowId", TypeName = "int")]
        public int? LogSlideShowId { get; set; }

        [Column("imageLink", TypeName ="varchar")]
        public string? ImageLink { get; set; } = string.Empty;

        [Column("capture", TypeName = "varchar")]
        public string? Capture { get; set; } = string.Empty;

        [ForeignKey("LogSlideShowId")]
        public virtual LogSlideShow? LogSlideShow { get; set; }
    }
}
