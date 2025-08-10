using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class UpdateSolemnVisitRequest
    {
        //public Guid SolemnVisitId { get; set; }
        public string Name { get; set; }
        public IFormFile? PortraitImage { get; set; }
        public IFormFile? LetterImage { get; set; }
        public Guid UserId { get; set; }
    }

    public class UpdateSolemnVisitRequestValidator : AbstractValidator<UpdateSolemnVisitRequest>
    {
        private const long MaxTotalSizeInBytes = 4L * 1024 * 1024 * 1024; // 4 GB size of upload
        public UpdateSolemnVisitRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            //RuleFor(x => x.SolemnVisitId)
            //    .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SolemnVisitId"]))
            //    .NotEqual(Guid.Empty).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SolemnVisitId"]));
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
                .Must(file => file == null || file.Length > 0)
                .WithMessage(CommonExtensions.GetValidateMessage(localizer["FileRequired"], localizer["PortraitImage"]));
            RuleFor(x => x.LetterImage)
                .Must(file => file == null || file.Length > 0)
                .WithMessage(CommonExtensions.GetValidateMessage(localizer["FileRequired"], localizer["LetterImage"]));
            // Only check total size when one or both files are present
            RuleFor(x => x)
                .Must(request =>
                {
                    long portraitSize = request.PortraitImage?.Length ?? 0;
                    long letterSize = request.LetterImage?.Length ?? 0;
                    long totalSize = portraitSize + letterSize;

                    return totalSize <= MaxTotalSizeInBytes;
                })
                .WithMessage(CommonExtensions.GetValidateMessage(localizer["MaxTotalSize"],
                    localizer["SolemnVisit"], MaxTotalSizeInBytes / (1024 * 1024)));
        }
    }
}
