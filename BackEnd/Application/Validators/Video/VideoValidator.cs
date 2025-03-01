using Application.Extension;
using Application.Interfaces;
using Domain.Localization;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;

namespace Application.Validators
{
    public class VideoValidator : IVideoValidator
    {
        private readonly IVideoService _videoService;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public VideoValidator(IVideoService videoService, IStringLocalizer<KLNSharedResources> localizer)
        {
            _videoService = videoService;
            _localizer = localizer;
        }

        public async Task<GetVideoResponse> CreateVideoAsyncValidator(AddVideoRequest addVideoRequest)
        {
            var validator = new AddVideoRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(addVideoRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _videoService.CreateVideoAsync(addVideoRequest);
        }

        public async Task<GetVideoResponse> UpdateVideoAsyncValidator(Guid id, UpdateVideoRequest updateVideoRequest)
        {
            var validator = new UpdateVideoRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(updateVideoRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            else if (id == null)
            {
                throw new ArgumentNullException(CommonExtensions.GetValidateMessage(_localizer["InvalidValue"], _localizer["VideoId"]));
            }
            return await _videoService.UpdateVideoAsync(id, updateVideoRequest);
        }
    }
}
