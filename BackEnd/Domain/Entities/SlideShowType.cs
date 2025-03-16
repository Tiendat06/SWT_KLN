using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("SlideShowType")]
    public class SlideShowType
    {
        [Key]
        [Required]
        [Column("slideShowTypeId", TypeName = "int")]
        public required int SlideShowTypeId { get; set; }

        [Column("typeName", TypeName = "nvarchar")]
        public string? TypeName { get; set; }

        [Column("typeDescription", TypeName = "nvarchar")]
        public string? TypeDescription { get; set; }

        //public virtual SlideShow? SlideShow { get; set; }
    }
}
