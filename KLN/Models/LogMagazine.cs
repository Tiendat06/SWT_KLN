using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("LogMagazine")]
    public class LogMagazine
    {
        [Key]
        [Required]
        [Column("logMagazineId", TypeName ="int")]
        public required int logMagazineId { get; set; }

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? updateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName ="varchar")]
        public string? process {  get; set; } = string.Empty;

        [Column("flag", TypeName ="varchar")]
        public string? flag {  get; set; } = string.Empty;

        [Column("title", TypeName = "nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? image { get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? createDate {  get; set; } = DateTime.Now;

        [Column("magazineContent", TypeName ="nvarchar")]
        public string? magazineContent {  get; set; } = string.Empty;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [Column("magazineId", TypeName ="varchar")]
        public string? magazineId {  get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user {  set; get; }

        [ForeignKey("magazineId")]
        public virtual Magazine? magazine { get; set; }
    }
}
