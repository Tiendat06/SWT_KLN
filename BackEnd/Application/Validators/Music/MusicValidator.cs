using Application.Extension;
using Application.Interfaces;
using Domain.Localization;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;

namespace Application.Validators
{
    public class MusicValidator : IMusicValidator
    {
        private readonly IMusicService _musicService;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public MusicValidator(IMusicService musicService, IStringLocalizer<KLNSharedResources> localizer)
        {
            _musicService = musicService;
            _localizer = localizer;
        }

        public async Task<GetMusicResponse> CreateMusicAsyncValidator(AddMusicRequest addMusicRequest)
        {
            var validator = new AddMusicRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(addMusicRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _musicService.CreateMusicAsync(addMusicRequest);
        }

        public async Task<GetMusicResponse> UpdateMusicAsyncValidator(Guid id, UpdateMusicRequest updateMusicRequest)
        {
            var validator = new UpdateMusicRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(updateMusicRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            else if (id == null)
            {
                throw new ArgumentNullException(CommonExtensions.GetValidateMessage(_localizer["InvalidValue"], _localizer["MusicId"]));
            }
            return await _musicService.UpdateMusicAsync(id, updateMusicRequest);
        }
    }
}
