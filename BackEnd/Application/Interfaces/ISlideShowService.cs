using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface ISlideShowService
    {
        Task<PaginationResponseDto<GetSlideShowResponse>> GetAllSlideShowsAsync(GetSlideShowRequest input);
        Task<GetSlideShowResponse?> GetSlideShowByIdAsync(Guid id);
        Task<GetSlideShowResponse> CreateSlideShowAsync(AddSlideShowRequest addSlideShowRequest);
        Task<GetSlideShowResponse> UpdateSlideShowAsync(Guid id, UpdateSlideShowRequest updateSlideShowRequest);
        Task<bool> DeleteSlideShowsAsync(DeleteSlideShowsRequest deleteSlideShowsRequest);
        Task<GetTotalSlideImageResponse> CountSlideImagePerSlideShowAsync(GetSlideShowRequest input);
    }
}
