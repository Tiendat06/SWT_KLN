using Application.DTOs.Blog.Input;
using Application.DTOs.Blog.Output;
using Application.Interfaces;
using FluentValidation.Results;

namespace Application.Validators
{
    public class BlogValidator
    {
        private readonly IBlogService _blogService;
        public BlogValidator(IBlogService blogService) 
        {
            _blogService = blogService;
        }

        public async Task<GetBlogResponse> CreateBlogAsyncValidator(AddBlogRequest addBlogRequest)
        {
            var validator = new AddBlogRequestValidator();
            ValidationResult result = await validator.ValidateAsync(addBlogRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _blogService.CreateBlogAsync(addBlogRequest);
        }

        public async Task<GetBlogResponse> UpdateBlogAsyncValidator(Guid id, UpdateBlogRequest updateBlogRequest)
        {
            var validator = new UpdateBlogRequestValidator();
            ValidationResult result = await validator.ValidateAsync(updateBlogRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            } else if(id == null)
            {
                throw new ArgumentNullException("Mã bài viết không hợp lệ !");
            }
            return await _blogService.UpdateBlogAsync(id, updateBlogRequest);
        }
    }
}
