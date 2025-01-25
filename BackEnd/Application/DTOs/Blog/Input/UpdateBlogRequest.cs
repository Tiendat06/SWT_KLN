using Application.DTOs.Blog.Resources;
using Application.DTOs.Site.Resources;
using Domain.Constracts;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Blog.Input
{
    public class UpdateBlogRequest
    {
        public IFormFile? BlogImageFile { get; set; }
        public string BlogTitle { get; set; }
        public string BlogContent { get; set; }
    }

    public class UpdateBlogRequestValidator : AbstractValidator<UpdateBlogRequest>
    {
        public UpdateBlogRequestValidator()
        {
            RuleFor(x => x.BlogTitle)
                .NotNull().WithMessage(BlogValidatorResources.BlogTitleNotEmpty)
                .NotEmpty().WithMessage(BlogValidatorResources.BlogTitleNotEmpty)
                .MaximumLength(BlogConsts.MaxBlogTitleLength).WithMessage(
                SiteValidatorResources.GetValidateMessage(SiteValidatorResources.MaxLength, 
                BlogValidatorResources.BlogTitle, BlogConsts.MaxBlogTitleLength));

            RuleFor(x => x.BlogContent)
                .NotNull().WithMessage(BlogValidatorResources.BlogContentNotEmpty)
                .NotEmpty().WithMessage(BlogValidatorResources.BlogContentNotEmpty);

            //RuleFor(x => x.BlogImageFile)
            //    .NotNull().WithMessage(BlogValidatorResources.BlogImageNotEmpty)
            //    .NotEmpty().WithMessage(BlogValidatorResources.BlogImageNotEmpty);
        }
    }
}
