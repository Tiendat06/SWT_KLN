using Application.DTOs.Blog.Input;
using Application.DTOs.Blog.Output;

namespace Application.Validators
{
    public interface IBlogValidator
    {
        Task<GetBlogResponse> CreateBlogAsyncValidator(AddBlogRequest addBlogRequest);
        Task<GetBlogResponse> UpdateBlogAsyncValidator(Guid id, UpdateBlogRequest updateBlogRequest);
    }
}
