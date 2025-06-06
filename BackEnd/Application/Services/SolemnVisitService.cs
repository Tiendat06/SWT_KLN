using Application.Extension;
using Application.Interfaces;
using Application.Mapper.SolemnVisits.Output;
using CloudinaryDotNet;
using Domain;
using Domain.Interfaces;
using Domain.Localization;
using KLN.Shared.CrossCuttingConcerns;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;

namespace Application.Services
{
    public class SolemnVisitService(
        ISolemnVisitRepository _solemnVisitRepository,
        IConfiguration _configuration,
        IUnitOfWork _unitOfWork,
        Cloudinary _cloudinary,
        IStringLocalizer<KLNSharedResources> _localizer
        ) : ISolemnVisitService
    {
        public async Task<PaginationResponseDto<GetSolemnVisitResponse>> GetAllSolemnVisitsAsync(GetSolemnVisitRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var solemnVisits = await _solemnVisitRepository.GetAllSolemnVisitsAsync(page, fetch);
            var totalSolemnVisit = await _solemnVisitRepository.CountSolemnVisitAsync();
            var solemnVisitMapper = GetSolemnVisitResponseMapper.GetSolemnVisitListMapEntityToDTO(solemnVisits);
            return new PaginationResponseDto<GetSolemnVisitResponse>(totalSolemnVisit, solemnVisitMapper);
        }
        public async Task<GetSolemnVisitResponse?> GetSolemnVisitByIdAsync(Guid id)
        {
            var solemnVisit = await _solemnVisitRepository.GetSolemnVisitByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SolemnVisit"]));

            return GetSolemnVisitResponseMapper.GetSolemnVisitMapEntityToDTO(solemnVisit);

        }
    }
}
