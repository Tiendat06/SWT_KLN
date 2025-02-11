using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace Application.DTOs.Magazine.Input
{
    public class AddMagazineRequest
    {
        public string Title { get; set; }
        public IFormFile Image { get; set; }
        public string MagazineContent { get; set; }
        public Guid UserId { get; set; }
    }

    public class AddMagazineRequestValidator : AbstractValidator<AddMagazineRequest>
    {
        public AddMagazineRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MagazineTitle"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MagazineTitle"]))
                .MaximumLength(MagazineConsts.MaxTitleLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["MagazineTitle"], MagazineConsts.MaxTitleLength
                ));

            RuleFor(x => x.MagazineContent)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MagazineContent"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MagazineContent"]));

            RuleFor(x => x.Image)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MagazineImage"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MagazineImage"]));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));
        }
    }
}
