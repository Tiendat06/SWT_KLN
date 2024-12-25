using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("Role")]
    public class Role
    {
        [Key]
        [Required]
        [Column("role_id", TypeName ="varchar")]
        public required string role_id { get; set; }

        [Column("role_name", TypeName ="nvarchar")]
        public string? role_name { get; set; } = string.Empty;

        [NotMapped]
        public virtual Account? account { get; set; }
    }
}
