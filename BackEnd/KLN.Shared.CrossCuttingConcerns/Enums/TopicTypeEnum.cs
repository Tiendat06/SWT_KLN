using System.ComponentModel.DataAnnotations;

namespace KLN.Shared.CrossCuttingConcerns.Enums
{
    public enum TopicTypeEnum
    {
        [Display(Name = "Không phân loại")]
        None = 0,

        [Display(Name = "Ảnh")]
        ImageType = 1,

        [Display(Name = "Video")]
        VideoType = 2,
    }

    public class TopicTypeName
    {
        public static string Text(TopicTypeEnum? topicTypeEnum)
        {
            return topicTypeEnum switch
            {
                TopicTypeEnum.None => "Không phân loại",
                TopicTypeEnum.ImageType => "HIỆN VẬT VÀ HÌNH ẢNH",
                TopicTypeEnum.VideoType => "NHÀ TRƯNG BÀY THÂN THẾ VÀ SỰ NGHIỆP CÁCH MẠNG",
                _ => string.Empty,
            };
        }
    }
}
