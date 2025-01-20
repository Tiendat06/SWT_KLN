using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("LogBlog")]
    public class LogBlog
    {
        [Key]
        [Required]
        [Column("logBlogId", TypeName ="int")]
        public required int logBlogId { get; set; }

        [Column("blogTitle", TypeName ="nvarchar")]
        public string? blogTitle { get; set; } = string.Empty;

        [Column("blogContent", TypeName ="nvarchar")]
        public string? blogContent {  get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("updateDate", TypeName ="datetime")]
        public DateTime? updateDate {  get; set; } = DateTime.Now;

        [Column("process", TypeName ="varchar")]
        public string? process {  get; set; } = string.Empty;

        [Column("flag", TypeName ="varchar")]
        public string? flag { get; set; } = string.Empty;

        [Column("userId", TypeName ="varchar")]
        public string? userId { get; set; } = string.Empty;

        [Column("blogId", TypeName = "varchar")]
        public string? blogId { get; set; } = string.Empty;

        [ForeignKey("blogId")]
        public virtual Blog? blog { get; set; }

        [ForeignKey("userId")]
        public virtual User? user { get; set; }


    }
}
