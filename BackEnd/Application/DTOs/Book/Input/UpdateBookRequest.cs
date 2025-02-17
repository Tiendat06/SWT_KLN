using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;


namespace Application
{
    public class UpdateBookRequest
    {
        public string Title { get; set; }
        public IFormFile? BookContent { get; set; }
        public string Publisher { get; set; }
        public string Author { get; set; }
        public DateTime YearPublic { get; set; }
        public IFormFile? Image { get; set; }
        public Guid UserId { get; set; }
    }

    public class UpdateBookRequestValidator : AbstractValidator<UpdateBookRequest>
    {
        public UpdateBookRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookTitle"]))
                //.NotEmpty().WithMessage(BookValidatorResources.TitleNotEmpty)
                .MaximumLength(BookConsts.MaxTitleLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["BookTitle"], BookConsts.MaxTitleLength
                ));

            RuleFor(x => x.BookContent)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookContent"]));
            //    .NotEmpty().WithMessage(BookValidatorResources.BookContentNotEmpty);

            RuleFor(x => x.Publisher)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookPublisher"]))
                //.NotEmpty().WithMessage(BookValidatorResources.PublisherNotEmpty)
                .MaximumLength(BookConsts.MaxPublisherLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["BookPublisher"], BookConsts.MaxPublisherLength
                ));

            RuleFor(x => x.Author)
                //.NotEmpty().WithMessage(BookValidatorResources.AuthorNotEmpty)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookAuthor"]))
                .MaximumLength(BookConsts.MaxAuthorLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["BookAuthor"], BookConsts.MaxAuthorLength
                ));

            RuleFor(x => x.YearPublic)
                //.NotEmpty().WithMessage(BookValidatorResources.YearPublicNotEmpty);
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookYearPublic"]));

            RuleFor(x => x.Image)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookImage"]));
            //    .NotEmpty().WithMessage(BookValidatorResources.ImageNotEmpty);

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));
        }
    }
}
