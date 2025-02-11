using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application.DTOs.Blog.Input
{
    public class AddBlogRequest
    {
        public IFormFile BlogImageFile { get; set; }
        public string BlogTitle { get; set; }
        public string BlogContent { get; set; }
        public Guid UserId { get; set; }

    }

    public class AddBlogRequestValidator : AbstractValidator<AddBlogRequest>
    {
        public AddBlogRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.BlogImageFile)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BlogImage"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BlogImage"]));

            RuleFor(x => x.BlogTitle)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BlogTitle"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BlogTitle"]))
                .MaximumLength(BlogConsts.MaxBlogTitleLength).WithMessage(
                CommonExtensions.GetValidateMessage(localizer["MaxLength"],
                localizer["BlogTitle"], BlogConsts.MaxBlogTitleLength));

            RuleFor(x => x.BlogContent)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BlogContent"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BlogContent"]));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));

        }
    }
}
