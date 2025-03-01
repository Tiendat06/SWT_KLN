namespace Application.Interfaces
{
    public interface IBlogService
    {
        //Task<IEnumerable<GetBlogResponse>> GetAllBlogsAsync();
        Task<GetBlogResponse?> GetBlogByIdAsync(Guid id);
        Task<PaginationResponseDto<GetBlogResponse>> GetAllBlogsAsync(GetAllBlogRequest input);
        Task<GetBlogResponse> CreateBlogAsync(AddBlogRequest addBlogRequest);
        Task<bool> DeleteBlogAsync(Guid id);
        Task<GetBlogResponse> UpdateBlogAsync(Guid id, UpdateBlogRequest updateBlogRequest);
    }
}
