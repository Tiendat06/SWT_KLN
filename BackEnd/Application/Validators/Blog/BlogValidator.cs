using Application.DTOs.Blog.Input;
using Application.DTOs.Blog.Output;
using Application.Extension;
using Application.Interfaces;
using Domain.Localization;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;

namespace Application.Validators
{
    public class BlogValidator : IBlogValidator
    {
        private readonly IBlogService _blogService;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public BlogValidator(IBlogService blogService, IStringLocalizer<KLNSharedResources> localizer) 
        {
            _blogService = blogService;
            _localizer = localizer;
        }

        public async Task<GetBlogResponse> CreateBlogAsyncValidator(AddBlogRequest addBlogRequest)
        {
            var validator = new AddBlogRequestValidator(_localizer);
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
            var validator = new UpdateBlogRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(updateBlogRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            } else if(id == null)
            {
                throw new ArgumentNullException(CommonExtensions.GetValidateMessage(_localizer["InvalidValue"], _localizer["BlogId"]));
            }
            return await _blogService.UpdateBlogAsync(id, updateBlogRequest);
        }
    }
}
