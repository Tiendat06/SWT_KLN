using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("Music")]
    public class Music
    {
        [Key]
        [Required]
        [Column("musicId", TypeName ="varchar")]
        public required string? musicId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("imageLink", TypeName = "varchar")]
        public string? imageLink { get; set; } = string.Empty;

        [Column("audioLink", TypeName ="varchar")]
        public string? audioLink {  get; set; } = string.Empty;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        // log music 1 - 1
        [NotMapped]
        public virtual ICollection<Music>? music { get; set; }
    }
}
