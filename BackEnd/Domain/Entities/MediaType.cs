using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("MediaType")]
    public class MediaType
    {
        [Key]
        [Required]
        [Column("mediaTypeId", TypeName = "int")]
        public required int Id { get; set; }

        [Column("typeName", TypeName = "nvarchar")]
        public string Name { get; set; } = string.Empty;

        [Column("typeDescription", TypeName = "nvarchar")]
        public string Description { get; set; } = string.Empty;
    }
}
