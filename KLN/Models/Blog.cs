using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("Blog")]
    public class Blog
    {
        [Key]
        [Required]
        [Column("blogId", TypeName ="varchar")]
        public required string blogId { get; set; }

        [Column]
        public string blogName { get; set; }
    }
}
