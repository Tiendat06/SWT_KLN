using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    [Table("LogTopic")]
    public class LogTopic
    {
        [Key]
        [Required]
        [Column("logTopicId", TypeName = "int")]
        public required int LogTopicId { get; set; }

        [Column("updateDate", TypeName = "datetime")]
        public DateTime? UpdateDate { get; set; } = DateTime.Now;

        [Column("process", TypeName = "varchar")]
        public string? Process { get; set; } = string.Empty;

        [Column("flag", TypeName = "bit")]
        public bool? Flag { get; set; } = false;

        [Column("capture", TypeName = "varchar")]
        public string? Capture { get; set; } = string.Empty;

        [Column("description", TypeName = "nvarchar")]
        public string? Description { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime CreateDate { get; set; } = DateTime.Now;

        [Column("images", TypeName = "nvarchar")]
        public string? Images { get; set; }

        [Column("videos", TypeName = "nvarchar")]
        public string? Videos { get; set; }

        [Column("topicId", TypeName = "uniqueidentifier")]
        public Guid? TopicId { get; set; }

        [Column("mediaTypeId", TypeName = "int")]
        public int? MediaTypeId { get; set; } = null;

        [ForeignKey("MediaTypeId")]
        public virtual MediaType? MediaType { get; set; }

        [Column("UserId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [ForeignKey("TopicId")]
        public virtual Topic? Topic { get; set; }

        //[NotMapped]
        //public virtual ICollection<LogTopicMedia>? LogTopicMedias { get; set; }
    }
}
