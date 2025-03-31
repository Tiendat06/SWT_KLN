using System.ComponentModel.DataAnnotations;

namespace KLN.Shared.CrossCuttingConcerns.Enums
{
    public enum SlideShowTypeEnum
    {
        [Display(Name = "Không phân loại")]
        None = 0,

        [Display(Name = "HIỆN VẬT VÀ HÌNH ẢNH")]
        Artifact = 1,

        [Display(Name = "NHÀ TRƯNG BÀY THÂN THẾ VÀ SỰ NGHIỆP CÁCH MẠNG")]
        ExhibitionHouse = 2,
    }

    public class SlideShowTypeName
    {
        public static string Text(SlideShowTypeEnum? slideShowType)
        {
            return slideShowType switch
            {
                SlideShowTypeEnum.None => "Không phân loại",
                SlideShowTypeEnum.Artifact => "HIỆN VẬT VÀ HÌNH ẢNH",
                SlideShowTypeEnum.ExhibitionHouse => "NHÀ TRƯNG BÀY THÂN THẾ VÀ SỰ NGHIỆP CÁCH MẠNG",
                _ => string.Empty,
            };
        }
    }
}
