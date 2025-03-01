//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Domain.Entities
//{
//    [Table("LogTopicMedia")]
//    public class LogTopicMedia
//    {
//        [Key]
//        [Required]
//        [Column("logTopicMediaId", TypeName = "int")]
//        public required int LogTopicMediaId { get; set; }

//        [Column("title", TypeName = "nvarchar")]
//        public string? Title { get; set; } = string.Empty;

//        [Column("imageLink", TypeName = "varchar")]
//        public string? ImageLink { get; set; } = string.Empty;

//        [Column("videoLink", TypeName = "varchar")]
//        public string? VideoLink { get; set; } = string.Empty;

//        [Column("logTopicId", TypeName = "int")]
//        public int LogTopicId { get; set; }

//        [ForeignKey("LogTopicId")]
//        public virtual LogTopic? LogTopic { get; set; }
//    }
//}
