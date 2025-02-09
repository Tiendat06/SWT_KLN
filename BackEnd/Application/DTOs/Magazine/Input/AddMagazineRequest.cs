using Application.DTOs.Magazine.Resources;
using Application.DTOs.Site.Resources;
using Domain.Constracts;
using FluentValidation;
using Microsoft.AspNetCore.Http;

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
        public AddMagazineRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage(MagazineValidatorResources.TitleNotEmpty)
                .NotEmpty().WithMessage(MagazineValidatorResources.TitleNotEmpty)
                .MaximumLength(MagazineConsts.MaxTitleLength).WithMessage(
                SiteValidatorResources.GetValidateMessage(
                    SiteValidatorResources.MaxLength, MagazineValidatorResources.MagazineTitle, MagazineConsts.MaxTitleLength
                ));

            RuleFor(x => x.MagazineContent)
                .NotNull().WithMessage(MagazineValidatorResources.MagazineContentNotEmpty)
                .NotEmpty().WithMessage(MagazineValidatorResources.MagazineContentNotEmpty);

            RuleFor(x => x.Image)
                .NotNull().WithMessage(MagazineValidatorResources.ImageNotEmpty)
                .NotEmpty().WithMessage(MagazineValidatorResources.ImageNotEmpty);

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(MagazineValidatorResources.UserIdNotEmpty)
                .NotEmpty().WithMessage(MagazineValidatorResources.UserIdNotEmpty);
        }
    }
}
