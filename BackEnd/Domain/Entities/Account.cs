using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Account")]
    public class Account
    {
        [Key]
        [Required]
        [Column("accountId", TypeName = "uniqueidentifier")]
        public required Guid AccountId { get; set; }

        [Column("username", TypeName = "nvarchar")]
        public string? UserName { get; set; } = string.Empty;

        [Column("password", TypeName ="varchar")]
        public string? Password { get; set; } = string.Empty;

        [Column("hide", TypeName ="bit")]
        public bool? IsHidden { get; set; } = false;

        [Column("passwordResetToken", TypeName ="varchar")]
        public string? PasswordResetToken { get; set; } = string.Empty;

        [Column("tokenExpiration", TypeName ="varchar")]
        public string? TokenExpiration { get; set; } = string.Empty;

        [Column("role_id", TypeName = "int")]
        public int? RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role? Role { get; set; }

        // User 1 - 1
        [NotMapped]
        public virtual User? User { get; set; }
    }
}
