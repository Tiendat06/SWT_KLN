using Application.Interfaces;

namespace Application.Validators
{
    public class SlideShowValidator : ISlideShowValidator
    {
        private readonly ISlideShowService _slideShowService;
        public SlideShowValidator(ISlideShowService slideShowService)
        {
            _slideShowService = slideShowService;
        }

    }
}
