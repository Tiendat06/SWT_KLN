using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application
{
    public class UpdateSlideShowRequest
    {
        public string Title { get; set; }
        public IFormFile? Image { get; set; }
        public string? Description { get; set; }
        public int MediaTypeId { get; set; }
        public int SlideShowTypeId { get; set; }
        public Guid UserId { get; set; }
        public List<GetSlideImageRequest> SlideImage { get; set; }
    }

    public class UpdateSlideImageRequest
    {
        public Guid SlideShowId { get; set; }
        public int Id { get; set; }
        public string? Capture { get; set; }
        public IFormFile? SlideImage { get; set; }
    }

    //public class UpdateSlideImageRequest
    //{
    //    public Guid SlideShowId { get; set; }
    //    public int SlideImageId { get; set; }
    //    public string? Capture { get; set; }
    //    public IFormFile? NewSlideImage { get; set; }
    //}


    public class UpdateSlideShowRequestValidator : AbstractValidator<UpdateSlideShowRequest>
    {
        public UpdateSlideShowRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
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
    public class UpdateSlideImageRequestValidator : AbstractValidator<UpdateSlideImageRequest>
    {
        public UpdateSlideImageRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.SlideShowId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideShowId"]));

            RuleFor(x => x.SlideImage)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideImage"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["SlideImage"]));
        }
    }
}