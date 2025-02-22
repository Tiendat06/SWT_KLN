//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace Domain.Entities
//{
//    [Table("SlideImage")]
//    public class SlideImage
//    {
//        [Key]
//        [Required]
//        [Column("slideImageId", TypeName ="uniqueidentifier")]
//        public required Guid? SlideImageId { get; set; }

//        [Column("imageLink", TypeName = "varchar")]
//        public string? ImageLink { get; set; } = string.Empty;

//        [Column("capture", TypeName = "varchar")]
//        public string? Capture { get; set; } = string.Empty;

//        [Column("isDeleted", TypeName = "bit")]
//        public bool? IsDeleted { get; set; } = false;

//        [Column("slideShowId", TypeName = "uniqueidentifier")]
//        public Guid? SlideShowId { get; set; }

//        [ForeignKey("SlideShowId")]
//        public virtual SlideShow? SlideShow { get; set; }
//    }
//}
