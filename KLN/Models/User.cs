using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        [Required]
        [Column("userId", TypeName="varchar")]
        public required string userId { get; set; }

        [Column("name", TypeName ="nvarchar")]
        public string? name { get; set; } = string.Empty;

        [Column("email", TypeName ="varchar")]
        public string? email { get; set; } = string.Empty;

        [Column("accountId", TypeName ="varchar")]
        public string? accountId { get; set; } = string.Empty;

        [ForeignKey("accountId")]
        public virtual Account? account { get; set; }
    }
}
