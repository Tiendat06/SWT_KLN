using KLN.Shared.CrossCuttingConcerns;
using KLN.Shared.CrossCuttingConcerns.Enums;
namespace Application
{
    public class GetSlideShowRequest : PaginationWithSearchAndMediaTypeDto
    {
        public int SlideShowType { get; set; } = (int)SlideShowTypeEnum.None;
    }
}
