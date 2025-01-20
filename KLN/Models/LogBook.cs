using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("LogBook")]
    public class LogBook
    {
        [Key]
        [Required]
        [Column("logBookId", TypeName ="int")]
        public required int logBookId { get; set; }

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? updateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName = "varchar")]
        public string? process { get; set; } = string.Empty;

        [Column("flag", TypeName = "varchar")]
        public string? flag { get; set; } = string.Empty;

        [Column("title", TypeName ="nvarchar")]
        public string? title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? image { get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? createDate {  get; set; } = DateTime.Now;

        [Column("bookContent", TypeName ="nvarchar")]
        public string? bookContent { get; set; } = string.Empty;

        [Column("publisher", TypeName ="nvarchar")]
        public string? publisher {  get; set; } = string.Empty;

        [Column("author", TypeName ="nvarchar")]
        public string? author {  get; set; } = string.Empty;

        [Column("yearPublic", TypeName ="datetime")]
        public DateTime? yearPublic {  get; set; } = DateTime.Now;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [Column("bookId", TypeName ="varchar")]
        public string? bookId {  get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        [ForeignKey("bookId")]
        public virtual Book? book { get; set; }
    }
}
