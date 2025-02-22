using Application.Interfaces;
using Application.Mapper.SlideImages.Output;
using Domain;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;

namespace Application.Services
{
    public class SlideImageService : ISlideImageService
    {
        #region Fields
        private readonly Domain.Interfaces.ISlideImageRepository _slideImageRepository;
        //private readonly ILogSlideImageRepository _logSlideImageRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public SlideImageService(
            Domain.Interfaces.ISlideImageRepository slideImageRepository,
            IUnitOfWork unitOfWork,
            //ILogSlideShowRepository logSlideShowRepository,
            Cloudinary cloudinary,
            IConfiguration configuration,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _slideImageRepository = slideImageRepository;
            _unitOfWork = unitOfWork;
            //_logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
            _localizer = localizer;
        }
        #endregion
        //public async Task<IEnumerable<GetSlideImageResponse>> GetAllSlideImagesAsync()
        //{
        //    var slideImages = await _slideImageRepository.GetAllSlideImagesAsync();

        //    return GetSlideImageResponseMapper.GetSlideImageListMapEntityToDTO(slideImages);
        //}
        //public async Task<GetSlideImageResponse?> GetSlideImageByIdAsync(Guid id)
        //{
        //    var slideImage = await _slideImageRepository.GetSlideImageByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SlideImage"]));

        //    return GetSlideImageResponseMapper.GetSlideImageMapEntityToDTO(slideImage);
        //}
    }
}
