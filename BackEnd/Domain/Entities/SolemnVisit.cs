using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("SolemnVisit")]
    public class SolemnVisit
    {
        [Key]
        [Required]
        [Column("visitId", TypeName = "uniqueidentifier")]
        public required Guid VisitId { get; set; }

        [Column("name", TypeName = "nvarchar")]
        public string? Name { get; set; } = string.Empty;

        [Column("portraitImage", TypeName = "varchar")]
        public string? PortraitImage { get; set; } = string.Empty;

        [Column("letterImage", TypeName ="varchar")]
        public string? LetterImage {  get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [NotMapped]
        // log solemVisit 1 - 1
        public virtual ICollection<LogSolemVisit>? LogSolemVisits { get; set; }
    }
}
