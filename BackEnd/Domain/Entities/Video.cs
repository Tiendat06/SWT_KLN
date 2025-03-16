using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Video")]
    public class Video
    {
        [Key]
        [Required]
        [Column("videoId", TypeName = "uniqueidentifier")]
        public required Guid? VideoId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        [Column("imageLink", TypeName = "varchar")]
        public string? ImageLink { get; set; } = string.Empty;

        [Column("videoLink", TypeName = "varchar")]
        public string? VideoLink {  get; set; } = string.Empty;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("mediaTypeId", TypeName = "int")]
        public int? MediaTypeId { get; set; } = null;

        [ForeignKey("MediaTypeId")]
        public virtual MediaType? MediaType { get; set; }

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        //[NotMapped]
        // log video: 1 - 1
        public virtual ICollection<LogVideo>? LogVideos { get; set; }
    }
}
