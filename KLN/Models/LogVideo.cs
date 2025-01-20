using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("LogVideo")]
    public class LogVideo
    {
        [Key]
        [Required]
        [Column("logVideoId", TypeName ="varchar")]
        public required string? logVideoId { get; set; }

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

        [Column("imageLink", TypeName ="varchar")]
        public string? imageLink {  get; set; } = string.Empty;

        [Column("videoLink", TypeName ="varchar")]
        public string? videoLink {  get; set; } = string.Empty;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [Column("videoId", TypeName ="varchar")]
        public string? videoId { get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? User { get; set; }

        [ForeignKey("videoId")]
        public virtual Video? video { get; set; }
    }
}
