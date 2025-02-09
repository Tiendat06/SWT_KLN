using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("TopicMedia")]
    public class TopicMedia
    {
        [Key]
        [Required]
        [Column("topicMediaId", TypeName = "uniqueidentifier")]
        public required Guid TopicMediaId { get; set; }

        [Column("title", TypeName = "nvarchar")]
        public string? Title { get; set; } = string.Empty;

        [Column("image", TypeName = "varchar")]
        public string? Image { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime CreateDate { get; set; } = DateTime.Now;

        [Column("topicMediaContent", TypeName = "nvarchar")]
        public string? TopicMediaContent { get; set; } = string.Empty;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("userId", TypeName = "uniqueidentifier")]
        public Guid? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [NotMapped]
        public virtual ICollection<LogTopicMedia>? LogTopicMedias { get; set; }

    }
}
