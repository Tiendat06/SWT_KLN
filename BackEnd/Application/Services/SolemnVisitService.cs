using Application.Interfaces;
using Application.Mapper.SolemnVisits.Output;
using Domain;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;

namespace Application.Services
{
    public class SolemnVisitService : ISolemnVisitService
    {
        #region Fields
        private readonly Domain.Interfaces.ISolemnVisitRepository _solemnVisitRepository;
        //private readonly ILogSolemnVisitRepository _logSolemnVisitRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public SolemnVisitService(
            Domain.Interfaces.ISolemnVisitRepository solemnVisitRepository,
            IUnitOfWork unitOfWork,
            //ILogSolemnVisitRepository logSolemnVisitRepository,
            Cloudinary cloudinary,
            IConfiguration configuration,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _solemnVisitRepository = solemnVisitRepository;
            _unitOfWork = unitOfWork;
            //_logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
            _localizer = localizer;
        }
        #endregion
        public async Task<IEnumerable<GetSolemnVisitResponse>> GetAllSolemnVisitsAsync(GetSolemnVisitRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var solemnVisits = await _solemnVisitRepository.GetAllSolemnVisitsAsync(page, fetch);

            return GetSolemnVisitResponseMapper.GetSolemnVisitListMapEntityToDTO(solemnVisits);
        }
        public async Task<GetSolemnVisitResponse?> GetSolemnVisitByIdAsync(Guid id)
        {
            var solemnVisit = await _solemnVisitRepository.GetSolemnVisitByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SolemnVisit"]));

            return GetSolemnVisitResponseMapper.GetSolemnVisitMapEntityToDTO(solemnVisit);

        }
    }
}
