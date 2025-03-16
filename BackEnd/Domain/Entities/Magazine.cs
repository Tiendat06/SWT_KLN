using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Magazine")]
    public class Magazine
    {
        [Key]
        [Required]
        [Column("magazineId", TypeName = "uniqueidentifier")]
        public required Guid MagazineId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? Image { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime CreateDate { get; set; } = DateTime.Now;

        [Column("magazineContent", TypeName = "nvarchar")]
        public string? MagazineContent { get; set; } = string.Empty;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("Description", TypeName = "nvarchar")]
        public string? Description { get; set; } = string.Empty;

        [Column("mediaTypeId", TypeName = "int")]
        public int? MediaTypeId { get; set; } = null;

        [ForeignKey("MediaTypeId")]
        public virtual MediaType? MediaType { get; set; }

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        //[NotMapped]
        public virtual ICollection<LogMagazine>? LogMagazines { get; set; }

    }
}
