using KLN.Shared.CrossCuttingConcerns;

namespace Application.Interfaces
{
    public interface IBlogService
    {
        //Task<IEnumerable<GetBlogResponse>> GetAllBlogsAsync();
        Task<GetBlogResponse?> GetBlogByIdAsync(Guid id);
        Task<PaginationResponseDto<GetBlogResponse>> GetAllBlogsAsync(GetAllBlogRequest input);
        Task<GetBlogResponse> CreateBlogAsync(AddBlogRequest addBlogRequest);
        Task<bool> DeleteBlogAsync(Guid id);
        Task<bool> DeleteMultipleBlogsAsync(List<Guid> ids);
        Task<GetBlogResponse> UpdateBlogAsync(Guid id, UpdateBlogRequest updateBlogRequest);
    }
}
