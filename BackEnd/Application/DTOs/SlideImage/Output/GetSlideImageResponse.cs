using Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.SlideImage.Output
{
    public class GetSlideImageResponse
    {
        public required Guid? SlideImageId { get; set; }
        public string? ImageLink { get; set; }
        public string? Capture { get; set; }
        public Guid? SlideShowId { get; set; }
        public string? Title { get; set; }
        public DateTime? CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }

    }

    public class GetSlideImageResponseValidator : AbstractValidator<GetSlideImageResponse>
    {
        public GetSlideImageResponseValidator()
        {

        }
    }
}
