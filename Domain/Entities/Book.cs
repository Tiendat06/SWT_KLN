using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Book")]
    public class Book
    {
        [Key]
        [Required]
        [Column("bookId", TypeName ="varchar")]
        public string? bookId { get; set; }

        [Column("title", TypeName ="nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("bookContent", TypeName ="nvarchar")]
        public string? bookContent { get; set; } = string.Empty;

        [Column("publisher", TypeName ="nvarchar")]
        public string? publisher { get; set; } = string.Empty;

        [Column("author", TypeName ="nvarchar")]
        public string? author { get; set; } = string.Empty;

        [Column("yearPublic", TypeName ="datetime")]
        public DateTime? yearPublic { get; set; } = DateTime.Now;

        [Column("image", TypeName ="varchar")]
        public string? image {  get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("userId", TypeName ="varchar")]
        public string? userId { get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        [NotMapped]
        public virtual ICollection<LogBook>? logBook { get; set; }
    }
}
