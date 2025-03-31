using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Book")]
    public class Book
    {
        [Key]
        [Required]
        [Column("bookId", TypeName ="uniqueidentifier")]
        public required Guid BookId { get; set; }

        [Column("title", TypeName ="nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("bookContent", TypeName ="nvarchar")]
        public string? BookContent { get; set; } = string.Empty;

        [Column("publisher", TypeName ="nvarchar")]
        public string? Publisher { get; set; } = string.Empty;

        [Column("author", TypeName ="nvarchar")]
        public string? Author { get; set; } = string.Empty;

        [Column("yearPublic", TypeName = "varchar")]
        public string? YearPublic { get; set; } = string.Empty;

        [Column("image", TypeName ="varchar")]
        public string? Image {  get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime CreateDate { get; set; } = DateTime.Now;

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
        public virtual ICollection<LogBook>? LogBooks { get; set; }
    }
}
