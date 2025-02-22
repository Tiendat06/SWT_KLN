using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Blog")]
    public class Blog
    {
        [Key]
        [Required]
        [Column("blogId", TypeName = "uniqueidentifier")]
        public required Guid BlogId { get; set; }

        [Column("blogImage", TypeName = "varchar")]
        public string? BlogImage { get; set; } = string.Empty;

        [Column("blogTitle", TypeName ="nvarchar")]
        public string? BlogTitle { get; set; } = string.Empty;

        [Column("blogContent", TypeName ="nvarchar")]
        public string? BlogContent { get; set; } = string.Empty;

        [Column("createDate", TypeName ="datetime")]
        public DateTime? CreateDate { get; set; } = DateTime.Now;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        // log blog 1 - 1
        //[NotMapped]
        public virtual ICollection<LogBlog>? LogBlogs { get; set; }
    }
}
