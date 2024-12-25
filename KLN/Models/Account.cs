using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("Account")]
    public class Account
    {
        [Key]
        [Required]
        [Column("accountId", TypeName ="varchar")]
        public required string accountId { get; set; }

        [Column("username", TypeName = "nvarchar")]
        public string? username { get; set; } = string.Empty;

        [Column("password", TypeName ="varchar")]
        public string? password { get; set; } = string.Empty;

        [Column("hide", TypeName ="bit")]
        public bool? hide { get; set; } = false;

        [Column("passwordResetToken", TypeName ="varchar")]
        public string? passwordResetToken { get; set; } = string.Empty;

        [Column("tokenExpiration", TypeName ="varchar")]
        public string? tokenExpiration { get; set; } = string.Empty;

        [Column("role_id", TypeName = "varchar")]
        public string? role_id { get; set; } = string.Empty;

        [ForeignKey("role_id")]
        public virtual Role? role { get; set; }

        //[NotMapped]
        //public User user { get; set; }
    }
}
