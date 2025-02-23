using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class AddVideoRequest
    {
        public string Title { get; set; }
        public IFormFile ImageLink { get; set; }
        public string VideoLink { get; set; }
        public Guid UserId { get; set; }
    }

    public class AddVideoRequestValidator : AbstractValidator<AddVideoRequest>
    {
        public AddVideoRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["VideoTitle"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["VideoTitle"]))
                .MaximumLength(VideoConsts.MaxTitleLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["VideoTitle"], VideoConsts.MaxTitleLength
                ));

            RuleFor(x => x.VideoLink)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["VideoLink"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["VideoLink"]));

            RuleFor(x => x.ImageLink)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["ImageLink"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["ImageLink"]));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));
        }
    }
}
