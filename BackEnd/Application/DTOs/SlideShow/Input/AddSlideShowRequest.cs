using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class AddSlideShowRequest
    {
        public string Title { get; set; }
        public IFormFile Image { get; set; }
        public string? Description { get; set; }
        public int MediaTypeId { get; set; }
        public int SlideShowTypeId { get; set; }
        public Guid UserId { get; set; }
        public List<GetSlideImageRequest> SlideImage { get; set; }
    }

    public class AddSlideImageRequest
    {
        public Guid? SlideShowId { get; set; }
        public int MediaTypeId { get; set; }
        public int SlideShowTypeId { get; set; }
        public string? Capture { get; set; }
        public IFormFile SlideImage { get; set; }
    }

    public class AddSlideShowRequestValidator : AbstractValidator<AddSlideShowRequest>
    {
        public AddSlideShowRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Image)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowImage"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowImage"]));

            RuleFor(x => x.SlideImage)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideImage"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideImage"]));

            RuleFor(x => x.Title)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowTitle"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowTitle"]))
                .MaximumLength(SlideShowConsts.MaxTitleLength).WithMessage(
                CommonExtensions.GetValidateMessage(localizer["MaxLength"],
                localizer["SlideShowTitle"], SlideShowConsts.MaxTitleLength));

            RuleFor(x => x.SlideShowTypeId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowTypeId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowTypeId"]));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));

            RuleFor(x => x.MediaTypeId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]));
        }
    }
    public class AddSlideImageRequestValidator : AbstractValidator<AddSlideImageRequest>
    {
        public AddSlideImageRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.SlideShowTypeId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowTypeId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowTypeId"]));

            RuleFor(x => x.MediaTypeId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]));

            RuleFor(x => x.SlideImage)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideImage"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideImage"]));
        }
    }
}
