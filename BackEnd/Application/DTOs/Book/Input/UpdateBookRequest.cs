using Application.DTOs.Book.Resources;
using Application.DTOs.Site.Resources;
using Domain.Constracts;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Book.Input
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
        public UpdateBookRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotNull().WithMessage(BookValidatorResources.TitleNotEmpty)
                .NotEmpty().WithMessage(BookValidatorResources.TitleNotEmpty)
                .MaximumLength(BookConsts.MaxTitleLength).WithMessage(
                SiteValidatorResources.GetValidateMessage(
                    SiteValidatorResources.MaxLength, BookValidatorResources.BookTitle, BookConsts.MaxTitleLength
                ));

            //RuleFor(x => x.BookContent)
            //    .NotNull().WithMessage(BookValidatorResources.BookContentNotEmpty)
            //    .NotEmpty().WithMessage(BookValidatorResources.BookContentNotEmpty);

            RuleFor(x => x.Publisher)
                .NotNull().WithMessage(BookValidatorResources.PublisherNotEmpty)
                .NotEmpty().WithMessage(BookValidatorResources.PublisherNotEmpty)
                .MaximumLength(BookConsts.MaxPublisherLength).WithMessage(
                SiteValidatorResources.GetValidateMessage(
                    SiteValidatorResources.MaxLength, BookValidatorResources.Publisher, BookConsts.MaxPublisherLength
                ));

            RuleFor(x => x.Author)
                .NotEmpty().WithMessage(BookValidatorResources.AuthorNotEmpty)
                .NotNull().WithMessage(BookValidatorResources.AuthorNotEmpty)
                .MaximumLength(BookConsts.MaxAuthorLength).WithMessage(
                SiteValidatorResources.GetValidateMessage(
                    SiteValidatorResources.MaxLength, BookValidatorResources.Author, BookConsts.MaxAuthorLength
                ));

            RuleFor(x => x.YearPublic)
                .NotEmpty().WithMessage(BookValidatorResources.YearPublicNotEmpty)
                .NotNull().WithMessage(BookValidatorResources.YearPublicNotEmpty);

            //RuleFor(x => x.Image)
            //    .NotNull().WithMessage(BookValidatorResources.ImageNotEmpty)
            //    .NotEmpty().WithMessage(BookValidatorResources.ImageNotEmpty);

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(BookValidatorResources.UserIdNotEmpty)
                .NotEmpty().WithMessage(BookValidatorResources.UserIdNotEmpty);
        }
    }
}
