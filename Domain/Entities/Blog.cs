using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Blog")]
    public class Blog
    {
        [Key]
        [Required]
        [Column("blogId", TypeName ="varchar")]
        public required string blogId { get; set; }

        [Column("blogTitle", TypeName ="nvarchar")]
        public string blogTitle { get; set; } = string.Empty;

        [Column("blogContent", TypeName ="nvarchar")]
        public string blogContent { get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime createDate { get; set; } = DateTime.Now;

        [Column("userId", TypeName ="varchar")]
        public string userId { get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        // log blog 1 - 1
        [NotMapped]
        public virtual ICollection<LogBlog>? LogBlog { get; set; }
    }
}
