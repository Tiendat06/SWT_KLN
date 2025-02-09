using Application.DTOs.SlideImage.Output;
using Application.Interfaces;
using Application.Mapper.SlideImages.Output;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using System.Reflection.Metadata;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Application.Utils;
using System.Text.Json;
using Application.Extension;

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
        #endregion

        #region Constructor
        public SlideImageService(
            Domain.Interfaces.ISlideImageRepository slideImageRepository,
            IUnitOfWork unitOfWork,
            //ILogSlideShowRepository logSlideShowRepository,
            Cloudinary cloudinary,
            IConfiguration configuration
        )
        {
            _slideImageRepository = slideImageRepository;
            _unitOfWork = unitOfWork;
            //_logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
        }
        #endregion
        public async Task<IEnumerable<GetSlideImageResponse>> GetAllSlideImagesAsync()
        {
            var slideImages = await _slideImageRepository.GetAllSlideImagesAsync();

            return GetSlideImageResponseMapper.GetSlideImageListMapEntityToDTO(slideImages);
        }
        public async Task<GetSlideImageResponse?> GetSlideImageByIdAsync(Guid id)
        {
            var slideImage = await _slideImageRepository.GetSlideImageByIdAsync(id) ?? throw new KeyNotFoundException("SlideImage khong ton tai !");

            return GetSlideImageResponseMapper.GetSlideImageMapEntityToDTO(slideImage);
        }
    }
}
