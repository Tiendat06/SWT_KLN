using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface ISlideShowTypeService
    {
        Task<PaginationResponseDto<GetSlideShowTypeOutputDto>> GetSlideShowTypeListAsync(GetSlideShowInputDto input);
    }
}
