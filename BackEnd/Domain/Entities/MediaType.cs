using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class MediaType
    {
        [Key]
        [Required]
        [Column("blogTypeId", TypeName = "int")]
        public int Id { get; set; }

        [Column("typeName", TypeName = "nvarchar")]
        public string Name { get; set; } = string.Empty;

        [Column("typeDescription", TypeName = "nvarchar")]
        public string Description { get; set; } = string.Empty;
        public virtual Blog? Blog { get; set; }
    }
}
