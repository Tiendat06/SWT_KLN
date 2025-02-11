using Application.DTOs.Magazine.Input;
using Application.DTOs.Magazine.Output;
using Application.Extension;
using Application.Interfaces;
using Domain.Localization;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;

namespace Application.Validators
{
    public class MagazineValidator : IMagazineValidator
    {
        private readonly IMagazineService _magazineService;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public MagazineValidator(IMagazineService magazineService, IStringLocalizer<KLNSharedResources> localizer)
        {
            _magazineService = magazineService;
            _localizer = localizer;
        }

        public async Task<GetMagazineResponse> CreateMagazineAsyncValidator(AddMagazineRequest addMagazineRequest)
        {
            var validator = new AddMagazineRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(addMagazineRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _magazineService.CreateMagazineAsync(addMagazineRequest);
        }

        public async Task<GetMagazineResponse> UpdateMagazineAsyncValidator(Guid id, UpdateMagazineRequest updateMagazineRequest)
        {
            var validator = new UpdateMagazineRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(updateMagazineRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            else if (id == null)
            {
                throw new ArgumentNullException(CommonExtensions.GetValidateMessage(_localizer["InvalidValue"], _localizer["MagazineId"]));
            }
            return await _magazineService.UpdateMagazineAsync(id, updateMagazineRequest);
        }
    }
}
