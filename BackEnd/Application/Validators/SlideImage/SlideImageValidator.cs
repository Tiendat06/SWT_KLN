using Application.Interfaces;

namespace Application.Validators
{
    public class SlideImageValidator : ISlideImageValidator
    {
        private readonly ISlideImageService _slideImageService;
        public SlideImageValidator(ISlideImageService slideImageService)
        {
            _slideImageService = slideImageService;
        }
    }
}
