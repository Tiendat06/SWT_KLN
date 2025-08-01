using Application.Interfaces;
using Domain.Localization;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;

namespace Application.Validators
{
    public class SolemnVisitValidator : ISolemnVisitValidator
    {
        private readonly ISolemnVisitService _solemnVisitService;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public SolemnVisitValidator(ISolemnVisitService solemnVisitService, IStringLocalizer<KLNSharedResources> localizer)
        {
            _solemnVisitService = solemnVisitService;
            _localizer = localizer;
        }
        public async Task<GetSolemnVisitResponse> CreateSolemnVisitAsyncValidator(AddSolemnVisitRequest addSolemnVisitRequest)
        {
            var validator = new AddSolemnVisitRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(addSolemnVisitRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _solemnVisitService.CreateSolemnVisitAsync(addSolemnVisitRequest);
        }
        public async Task<GetSolemnVisitResponse> UpdateSolemnVisitAsyncValidator(Guid id, UpdateSolemnVisitRequest updateSolemnVisitRequest)
        {
            var validator = new UpdateSolemnVisitRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(updateSolemnVisitRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _solemnVisitService.UpdateSolemnVisitAsync(id, updateSolemnVisitRequest);
        }
    }
}
