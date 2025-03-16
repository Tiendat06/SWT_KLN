using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Role")]
    public class Role
    {
        [Key]
        [Required]
        [Column("role_id", TypeName ="int")]
        public required int RoleId { get; set; }

        [Column("role_name", TypeName ="varchar")]
        public string? RoleName { get; set; } = string.Empty;

        //[NotMapped]
        //[ForeignKey("RoleId")]
        //public virtual Account? Account { get; set; }
    }
}
