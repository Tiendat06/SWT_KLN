using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("SlideShow")]
    public class SlideShow
    {
        [Key]
        [Required]
        [Column("slideShowId", TypeName = "uniqueidentifier")]
        public required Guid? SlideShowId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? Image { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [NotMapped]
        public virtual ICollection<LogSlideShow>? LogSlideShows {  get; set; }

        [NotMapped]
        public virtual ICollection<SlideImage>? SlideImages { get; set; }
    }
}
