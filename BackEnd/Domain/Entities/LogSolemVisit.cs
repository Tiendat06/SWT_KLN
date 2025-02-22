using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("LogSolemVisit")]
    public class LogSolemVisit
    {
        // ok
        [Key]
        [Required]
        [Column("logSolemnId", TypeName ="int")]
        public required int? LogSolemnId { get; set; }

        //[Column("version", TypeName = "varchar")]
        //public string? Version { get; set; } = string.Empty;

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? UpdateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName = "varchar")]
        public string? Process { get; set; } = string.Empty;

        [Column("flag", TypeName = "bit")]
        public bool? Flag { get; set; } = false;

        [Column("name", TypeName = "nvarchar")]
        public string? Name { get; set; } = string.Empty;

        [Column("portraitImage", TypeName = "varchar")]
        public string? PortraitImage { get; set; } = string.Empty;

        [Column("letterImage", TypeName = "varchar")]
        public string? LetterImage { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [Column("visitId", TypeName = "uniqueidentifier")]
        public Guid? VisitId {  get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [ForeignKey("VisitId")]
        public virtual SolemnVisit? SolemVisit { get; set; }
    }
}
