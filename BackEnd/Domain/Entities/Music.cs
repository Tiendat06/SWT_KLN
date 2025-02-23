using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Music")]
    public class Music
    {
        [Key]
        [Required]
        [Column("musicId", TypeName ="uniqueidentifier")]
        public required Guid MusicId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("author", TypeName = "nvarchar")]
        public string? Author { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        [Column("imageLink", TypeName = "varchar")]
        public string? ImageLink { get; set; } = string.Empty;

        [Column("audioLink", TypeName ="varchar")]
        public string? AudioLink {  get; set; } = string.Empty;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        // log music 1 - 1
        //[NotMapped]
        public virtual ICollection<LogMusic>? LogMusics { get; set; }
    }
}
