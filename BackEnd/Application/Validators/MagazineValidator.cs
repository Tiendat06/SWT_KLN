using Application.DTOs.Magazine.Input;
using Application.DTOs.Magazine.Output;
using Application.Interfaces;
using FluentValidation.Results;

namespace Application.Validators
{
    public class MagazineValidator
    {
        private readonly IMagazineService _magazineService;
        public MagazineValidator(IMagazineService magazineService)
        {
            _magazineService = magazineService;
        }

        public async Task<GetMagazineResponse> CreateMagazineAsyncValidator(AddMagazineRequest addMagazineRequest)
        {
            var validator = new AddMagazineRequestValidator();
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
            var validator = new UpdateMagazineRequestValidator();
            ValidationResult result = await validator.ValidateAsync(updateMagazineRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            else if (id == null)
            {
                throw new ArgumentNullException("Mã bài viết không hợp lệ !");
            }
            return await _magazineService.UpdateMagazineAsync(id, updateMagazineRequest);
        }
    }
}
