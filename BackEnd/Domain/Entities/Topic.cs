using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    [Table("Topic")]
    public class Topic
    {
        [Key]
        [Required]
        [Column("topicId", TypeName = "uniqueidentifier")]
        public required Guid TopicId { get; set; }

        [Column("capture", TypeName = "varchar")]
        public string? Capture {  get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime CreateDate { get; set; } = DateTime.Now;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("UserId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [NotMapped]
        public virtual ICollection<TopicMedia>? TopicMedias { get; set; }

        [NotMapped]
        public virtual ICollection<LogTopic>? LogTopics { get; set; }

    }
}
