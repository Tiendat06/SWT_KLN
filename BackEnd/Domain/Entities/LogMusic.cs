using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("LogMusic")]
    public class LogMusic
    {
        // ok
        [Key]
        [Required]
        [Column("logMusicId", TypeName ="int")]
        public required int LogMusicId { get; set; }

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

        [Column("author", TypeName = "nvarchar")]
        public string? Author { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        [Column("imageLink", TypeName = "varchar")]
        public string? ImageLink { get; set; } = string.Empty;

        [Column("audioLink", TypeName = "varchar")]
        public string? AudioLink { get; set; } = string.Empty;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [Column("musicId", TypeName = "uniqueidentifier")]
        public Guid? MusicId {  get; set; }

        [Column("mediaTypeId", TypeName = "int")]
        public int? MediaTypeId { get; set; } = null;

        [ForeignKey("MediaTypeId")]
        public virtual MediaType? MediaType { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [ForeignKey("MusicId")]
        public virtual Music? Music { get; set; }
    }
}
