using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Magazine")]
    public class Magazine
    {
        [Key]
        [Required]
        [Column("magazineId", TypeName ="varchar")]
        public required string magazineId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? image { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("magazineContent", TypeName = "nvarchar")]
        public string? magazineContent { get; set; } = string.Empty;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        [NotMapped]
        public virtual ICollection<LogMagazine>? logMagazine { get; set; }

    }
}
