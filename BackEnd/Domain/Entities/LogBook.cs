using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("LogBook")]
    public class LogBook
    {
        [Key]
        [Required]
        [Column("logBookId", TypeName ="int")]
        public required int LogBookId { get; set; }

        //[Column("version", TypeName = "varchar")]
        //public string? Version { get; set; } = string.Empty;

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? UpdateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName = "varchar")]
        public string? Process { get; set; } = string.Empty;

        [Column("flag", TypeName = "bit")]
        public bool? Flag { get; set; } = false;

        [Column("title", TypeName ="nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? Image { get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? CreateDate {  get; set; } = DateTime.Now;

        [Column("bookContent", TypeName ="nvarchar")]
        public string? BookContent { get; set; } = string.Empty;

        [Column("publisher", TypeName ="nvarchar")]
        public string? Publisher {  get; set; } = string.Empty;

        [Column("author", TypeName ="nvarchar")]
        public string? Author {  get; set; } = string.Empty;

        [Column("yearPublic", TypeName ="datetime")]
        public DateTime? YearPublic {  get; set; } = DateTime.Now;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [Column("bookId", TypeName = "uniqueidentifier")]
        public Guid? BookId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [ForeignKey("BookId")]
        public virtual Book? Book { get; set; }
    }
}
