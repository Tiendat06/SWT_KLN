using FluentValidation;

namespace Application
{
    public class GetSlideShowResponse
    {
        public required Guid? SlideShowId { get; set; }
        public string? Title { get; set; }
        public string? Image { get; set; }
        public DateTime? CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }
        public ICollection<GetSlideImageResponse>? SlideImages { get; set; }

    }

    public class GetSlideShowResponseValidator : AbstractValidator<GetSlideShowResponse>
    {
        public GetSlideShowResponseValidator()
        {

        }
    }
}
