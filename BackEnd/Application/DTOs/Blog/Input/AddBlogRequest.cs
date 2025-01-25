using Application.DTOs.Blog.Resources;
using Application.DTOs.Site.Resources;
using Domain.Constracts;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Blog.Input
{
    public class AddBlogRequest
    {
        public IFormFile BlogImageFile { get; set; }
        public string BlogTitle { get; set; }
        public string BlogContent { get; set; }
        public Guid UserId { get; set; }

    }

    public class AddBlogRequestValidator : AbstractValidator<AddBlogRequest>
    {
        public AddBlogRequestValidator()
        {
            RuleFor(x => x.BlogImageFile)
                .NotNull().WithMessage(BlogValidatorResources.BlogImageNotEmpty)
                .NotEmpty().WithMessage(BlogValidatorResources.BlogImageNotEmpty);

            RuleFor(x => x.BlogTitle)
                .NotNull().WithMessage(BlogValidatorResources.BlogTitleNotEmpty)
                .NotEmpty().WithMessage(BlogValidatorResources.BlogTitleNotEmpty)
                .MaximumLength(BlogConsts.MaxBlogTitleLength).WithMessage(
                SiteValidatorResources.GetValidateMessage(SiteValidatorResources.MaxLength, 
                BlogValidatorResources.BlogTitle, BlogConsts.MaxBlogTitleLength));

            RuleFor(x => x.BlogContent)
                .NotNull().WithMessage(BlogValidatorResources.BlogContentNotEmpty)
                .NotEmpty().WithMessage(BlogValidatorResources.BlogContentNotEmpty);

            RuleFor(x => x.UserId)
                .NotNull().WithMessage(BlogValidatorResources.UserIdNotEmpty)
                .NotEmpty().WithMessage(BlogValidatorResources.UserIdNotEmpty);

        }
    }
}
