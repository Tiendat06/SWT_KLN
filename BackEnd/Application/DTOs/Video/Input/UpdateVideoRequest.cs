using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class UpdateVideoRequest
    {
        public string Title { get; set; }
        public IFormFile ImageFile { get; set; }
        public IFormFile VideoFile { get; set; }
        public Guid UserId { get; set; }
    }

    public class UpdateVideoRequestValidator : AbstractValidator<UpdateVideoRequest>
    {
        public UpdateVideoRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["VideoTitle"]))
                .MaximumLength(VideoConsts.MaxTitleLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["VideoTitle"], VideoConsts.MaxTitleLength
                ));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));
        }
    }
}
