using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("LogSolemVisit")]
    public class LogSolemVisit
    {
        [Key]
        [Required]
        [Column("logSolemnId", TypeName ="varchar")]
        public required string? logSolemnId { get; set; }

        [Column("version", TypeName = "varchar")]
        public string? version { get; set; } = string.Empty;

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? updateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName = "varchar")]
        public string? process { get; set; } = string.Empty;

        [Column("flag", TypeName = "varchar")]
        public string? flag { get; set; } = string.Empty;

        [Column("name", TypeName = "nvarchar")]
        public string? name { get; set; } = string.Empty;

        [Column("portraitImage", TypeName = "varchar")]
        public string? portraitImage { get; set; } = string.Empty;

        [Column("letterImage", TypeName = "varchar")]
        public string? letterImage { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [Column("visitId", TypeName ="varchar")]
        public string? visitId {  get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        [ForeignKey("visitId")]
        public virtual SolemnVisit? solemVisit { get; set; }
    }
}
