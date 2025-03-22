using Application.Interfaces;
using Application.Mapper.SlideShows.Output;
using Domain;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns;

namespace Application.Services
{
    public class SlideShowService : ISlideShowService
    {
        #region Fields
        private readonly ISlideShowRepository _slideShowRepository;
        //private readonly ILogSlideShowRepository _logSlideShowRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public SlideShowService(
            Domain.Interfaces.ISlideShowRepository slideShowRepository,
            IUnitOfWork unitOfWork,
            //ILogSlideShowRepository logSlideShowRepository,
            Cloudinary cloudinary,
            IConfiguration configuration,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {   _slideShowRepository = slideShowRepository;
            _unitOfWork = unitOfWork;
            //_logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
            _localizer = localizer;
        }
        #endregion
        public async Task<PaginationResponseDto<GetSlideShowResponse>> GetAllSlideShowsAsync(GetSlideShowRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var mediaType = input.Type;
            var slideShowType = input.SlideShowType;
            var slideShows = await _slideShowRepository.GetAllSlideShowsAsync(page, fetch, mediaType, slideShowType);
            var totalSlideShow = await _slideShowRepository.CountSlideShowAsync(mediaType, slideShowType);
            var slideShowsMapper = GetSlideShowResponseMapper.GetSlideShowListMapEntityToDTO(slideShows);
            return new PaginationResponseDto<GetSlideShowResponse>(totalSlideShow, slideShowsMapper);
        }

        public async Task<GetSlideShowResponse?> GetSlideShowByIdAsync(Guid id)
        {
            var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SlideShow"]));
            
            return GetSlideShowResponseMapper.GetSlideShowMapEntityToDTO(slideShow);
        }
    }
}
