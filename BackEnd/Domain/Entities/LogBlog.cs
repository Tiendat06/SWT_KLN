using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("LogBlog")]
    public class LogBlog
    {
        [Key]
        [Required]
        [Column("logBlogId", TypeName ="int")]
        public required int LogBlogId { get; set; }

        [Column("blogImage", TypeName = "varchar")]
        public string? BlogImage { get; set; } = string.Empty;

        [Column("blogTitle", TypeName ="nvarchar")]
        public string? BlogTitle { get; set; } = string.Empty;

        [Column("blogContent", TypeName ="nvarchar")]
        public string? BlogContent {  get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        //[Column("version", TypeName = "varchar")]
        //public string? Version { get; set; } = string.Empty;

        [Column("updateDate", TypeName ="datetime")]
        public DateTime? UpdateDate {  get; set; } = DateTime.Now;

        [Column("process", TypeName ="varchar")]
        public string? Process {  get; set; } = string.Empty;

        [Column("flag", TypeName ="bit")]
        public bool? Flag { get; set; } = false;

        [Column("Description", TypeName = "nvarchar")]
        public string? Description { get; set; } = string.Empty;

        [Column("mediaTypeId", TypeName = "int")]
        public int? MediaTypeId { get; set; } = null;

        [ForeignKey("MediaTypeId")]
        public virtual MediaType? MediaType { get; set; }

        [Column("userId", TypeName ="uniqueidentifier")]
        public Guid? UserId { get; set; }

        [Column("blogId", TypeName = "uniqueidentifier")]
        public Guid? BlogId { get; set; }

        [ForeignKey("BlogId")]
        public virtual Blog? Blog { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }


    }
}
