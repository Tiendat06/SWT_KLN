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

        [Column("imageLink", TypeName = "varchar")]
        public string? ImageLink { get; set; } = string.Empty;

        [Column("videoLink", TypeName = "varchar")]
        public string? VideoLink { get; set; } = string.Empty;

        [Column("createDate", TypeName = "datetime")]
        public DateTime CreateDate { get; set; } = DateTime.Now;

        [Column("isDeleted", TypeName = "bit")]
        public bool? IsDeleted { get; set; } = false;

        [Column("topicId", TypeName = "uniqueidentifier")]
        public Guid? TopicId { get; set; }

        [ForeignKey("TopicId")]
        public virtual Topic? Topic { get; set; }

    }
}
