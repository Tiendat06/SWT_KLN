using Application.Extension;
using Domain.Constracts;
using Domain.Localization;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;


namespace Application
{
    public class AddBookRequest
    {
        public string Title { get; set; }
        public IFormFile BookContent { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public string Author { get; set; }
        public string YearPublic { get; set; }
        public int MediaTypeId { get; set; }
        public IFormFile Image { get; set; }
        public Guid UserId { get; set; }
    }

    public class AddBookRequestValidator : AbstractValidator<AddBookRequest>
    {
        public AddBookRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookTitle"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookTitle"]))
                .MaximumLength(BookConsts.MaxTitleLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"],
                    localizer["BookTitle"], BookConsts.MaxTitleLength
                ));

            RuleFor(x => x.BookContent)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookContent"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookContent"]));

            RuleFor(x => x.Publisher)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookPublisher"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookPublisher"]))
                .MaximumLength(BookConsts.MaxPublisherLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["BookPublisher"], BookConsts.MaxPublisherLength    
                ));

            RuleFor(x => x.Author)
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookAuthor"]))
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookAuthor"]))
                .MaximumLength(BookConsts.MaxAuthorLength).WithMessage(
                CommonExtensions.GetValidateMessage(
                    localizer["MaxLength"], localizer["BookAuthor"], BookConsts.MaxAuthorLength
                ));

            RuleFor(x => x.YearPublic)
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookYearPublic"]))
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookYearPublic"]));

            RuleFor(x => x.Image)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookImage"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["BookImage"]));

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["UserId"]));

            RuleFor(x => x.MediaTypeId)
                .NotNull().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]))
                .NotEmpty().WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["MediaTypeId"]));
        }
    }
}
