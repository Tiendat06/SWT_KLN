using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class AddSolemnVisitRequest
    {
        public string Name { get; set; }
        public IFormFile PortraitImage { get; set; }
        public IFormFile LetterImage { get; set; }
        public Guid UserId { get; set; }
    }

    public class AddSolemnVisitRequestValidator : AbstractValidator<AddSolemnVisitRequest>
    {
        private const long MaxTotalSizeInBytes = 4L * 1024 * 1024 * 1024; // 4 GB size of upload
        public AddSolemnVisitRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Name)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SolemnVisitName"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SolemnVisitName"]))
                .MaximumLength(SolemnVisitConsts.MaxNameLength).WithMessage(
                    CommonExtensions.GetValidateMessage(localizer["MaxLength"],
                        localizer["SolemnVisitName"], SolemnVisitConsts.MaxNameLength));
            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEqual(Guid.Empty).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));
            RuleFor(x => x.PortraitImage)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["PortraitImage"]))
                .Must(file => file.Length > 0).WithMessage(CommonExtensions.GetValidateMessage(localizer["FileRequired"], localizer["PortraitImage"]));
            RuleFor(x => x.LetterImage)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["LetterImage"]))
                .Must(file => file.Length > 0).WithMessage(CommonExtensions.GetValidateMessage(localizer["FileRequired"], localizer["LetterImage"]));
            RuleFor(x => x)
                .Must(request =>
                {
                    long totalSize = request.PortraitImage.Length + request.LetterImage.Length;
                    return totalSize <= MaxTotalSizeInBytes;
                }).WithMessage(CommonExtensions.GetValidateMessage(localizer["MaxTotalSize"], localizer["SolemnVisit"], MaxTotalSizeInBytes / (1024 * 1024)));
        }
    }
}
