﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KLN.Models
{
    [Table("SolemnVisit")]
    public class SolemnVisit
    {
        [Key]
        [Required]
        [Column("visitId", TypeName ="varchar")]
        public required string? visitId { get; set; }

        [Column("name", TypeName = "nvarchar")]
        public string? name { get; set; } = string.Empty;

        [Column("portraitImage", TypeName = "varchar")]
        public string? portraitImage { get; set; } = string.Empty;

        [Column("letterImage", TypeName ="varchar")]
        public string? letterImage {  get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime? createDate { get; set; } = DateTime.Now;

        [Column("userId", TypeName = "varchar")]
        public string? userId { get; set; } = string.Empty;

        [ForeignKey("userId")]
        public virtual User? user { get; set; }

        [NotMapped]
        // log solemVisit 1 - 1
        public virtual ICollection<LogSolemVisit>? logSolemVisit { get; set; }
    }
}
