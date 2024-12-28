using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("SlideImage")]
    public class SlideImage
    {
        [Key]
        [Required]
        [Column("slideImageId", TypeName ="int")]
        public required int? slideImageId { get; set; }

        [Column("imageLink", TypeName = "varchar")]
        public string? imageLink { get; set; } = string.Empty;

        [Column("capture", TypeName = "varchar")]
        public string? capture { get; set; } = string.Empty;

        [Column("slideShowId", TypeName = "varchar")]
        public string? slideShowId { get; set; } = string.Empty;

        [ForeignKey("slideShowId")]
        public virtual SlideShow? slideShow { get; set; }
    }
}
