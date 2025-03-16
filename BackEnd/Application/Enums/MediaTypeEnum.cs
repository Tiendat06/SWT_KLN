using System.ComponentModel.DataAnnotations;

namespace Application.Enums
{
    public enum MediaTypeEnum
    {
        [Display(Name = "Không phân loại")]
        None = 0,

        [Display(Name = "Khu lưu niệm bác Tôn")]
        TDTMemorial = 1,

        [Display(Name = "Chủ tịch Tôn Đức Thắng")]
        PresidentTDT = 2,

        [Display(Name = "Công trình mang tên bác Tôn")]
        TDTHandiwork = 3,
    }

    public class MediaTypeName
    {
        public static string Text(MediaTypeEnum? mediaType)
        {
            return mediaType switch
            {
                MediaTypeEnum.None => "Không phân loại",
                MediaTypeEnum.TDTMemorial => "Khu lưu niệm bác Tôn",
                MediaTypeEnum.PresidentTDT => "Chủ tịch Tôn Đức Thắng",
                MediaTypeEnum.TDTHandiwork => "Công trình mang tên bác Tôn",
                _ => string.Empty,
            };
        }
    }
}
