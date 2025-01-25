using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("LogVideo")]
    public class LogVideo
    {
        [Key]
        [Required]
        [Column("logVideoId", TypeName ="int")]
        public required int? LogVideoId { get; set; }

        //[Column("version", TypeName = "varchar")]
        //public string? Version { get; set; } = string.Empty;

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? UpdateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName = "varchar")]
        public string? Process { get; set; } = string.Empty;

        [Column("flag", TypeName = "bit")]
        public bool? Flag { get; set; } = false;

        [Column("title", TypeName = "nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        [Column("imageLink", TypeName ="varchar")]
        public string? ImageLink {  get; set; } = string.Empty;

        [Column("videoLink", TypeName ="varchar")]
        public string? VideoLink {  get; set; } = string.Empty;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [Column("videoId", TypeName = "uniqueidentifier")]
        public Guid? VideoId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [ForeignKey("VideoId")]
        public virtual Video? Video { get; set; }
    }
}
