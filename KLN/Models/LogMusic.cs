using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("LogMusic")]
    public class LogMusic
    {
        [Key]
        [Required]
        [Column("logMusicId", TypeName ="varchar")]
        public required string? logMusicId { get; set; }

        [Column("version", TypeName = "varchar")]
        public string? version { get; set; } = string.Empty;

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? updateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName = "varchar")]
        public string? process { get; set; } = string.Empty;

        [Column("flag", TypeName = "varchar")]
        public string? flag { get; set; } = string.Empty;

        [Column("title", TypeName = "nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("imageLink", TypeName = "varchar")]
        public string? imageLink { get; set; } = string.Empty;

        [Column("audioLink", TypeName = "varchar")]
        public string? audioLink { get; set; } = string.Empty;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [Column("musicId", TypeName ="varchar")]
        public string? musicId {  get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? User { get; set; }

        [ForeignKey("musicId")]
        public virtual Music? music { get; set; }
    }
}
