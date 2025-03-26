using Application.Interfaces;
using Domain.Localization;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;

namespace Application.Validators
{
    public class SlideShowValidator : ISlideShowValidator
    {
        private readonly ISlideShowService _SlideShowService;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public SlideShowValidator(ISlideShowService SlideShowService, IStringLocalizer<KLNSharedResources> localizer)
        {
            _SlideShowService = SlideShowService;
            _localizer = localizer;
        }

        public async Task<GetSlideShowResponse> CreateSlideShowAsyncValidator(AddSlideShowRequest addSlideShowRequest)
        {
            var validator = new AddSlideShowRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(addSlideShowRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _SlideShowService.CreateSlideShowAsync(addSlideShowRequest);
        }

        public async Task<GetSlideShowResponse> UpdateSlideShowAsyncValidator(Guid id, UpdateSlideShowRequest updateSlideShowRequest)
        {
            var validator = new UpdateSlideShowRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(updateSlideShowRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _SlideShowService.UpdateSlideShowAsync(id, updateSlideShowRequest);
        }
    }
}
