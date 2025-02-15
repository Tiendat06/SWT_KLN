using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class AddTopicRequest
    {
        public string Capture { get; set; }
        public Guid UserId { get; set; }
    }

    public class AddTopicRequestValidator : AbstractValidator<AddTopicRequest>
    {
        public AddTopicRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Capture)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicCapture"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["TopicCapture"]))
                .MaximumLength(TopicConsts.MaxCaptureLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["TopicCapture"], TopicConsts.MaxCaptureLength
                ));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));
        }
    }
}
