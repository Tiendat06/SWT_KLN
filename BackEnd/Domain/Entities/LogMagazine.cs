using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("LogMagazine")]
    public class LogMagazine
    {
        // ok
        [Key]
        [Required]
        [Column("logMagazineId", TypeName ="int")]
        public required int LogMagazineId { get; set; }

        //[Column("version", TypeName = "varchar")]
        //public string? Version { get; set; } = string.Empty;

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? UpdateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName ="varchar")]
        public string? Process {  get; set; } = string.Empty;

        [Column("flag", TypeName ="bit")]
        public bool? Flag { get; set; } = false;

        [Column("title", TypeName = "nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? Image { get; set; } = string.Empty;

        [Column("description", TypeName = "nvarchar")]
        public string? Description { get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? CreateDate {  get; set; } = DateTime.Now;

        [Column("magazineContent", TypeName ="nvarchar")]
        public string? MagazineContent {  get; set; } = string.Empty;

        [Column("mediaTypeId", TypeName = "int")]
        public int? MediaTypeId { get; set; } = null;

        [ForeignKey("MediaTypeId")]
        public virtual MediaType? MediaType { get; set; }

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [Column("magazineId", TypeName = "uniqueidentifier")]
        public Guid? MagazineId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { set; get; }

        [ForeignKey("MagazineId")]
        public virtual Magazine? Magazine { get; set; }
    }
}
