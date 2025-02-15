using FluentValidation;

namespace Application.DTOs.SlideImage.Output
{
    public class GetSlideImageResponse
    {
        public required Guid? SlideImageId { get; set; }
        public string? ImageLink { get; set; }
        public string? Capture { get; set; }
        public Guid? SlideShowId { get; set; }

    }

    public class GetSlideImageResponseValidator : AbstractValidator<GetSlideImageResponse>
    {
        public GetSlideImageResponseValidator()
        {

        }
    }
}
