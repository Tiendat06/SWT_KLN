using Application.DTOs.SlideShow.Output;
using Application.Interfaces;
using Application.Mapper.SlideShows.Output;
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
    public class SlideShowService : ISlideShowService
    {
        #region Fields
        private readonly Domain.Interfaces.ISlideShowRepository _slideShowRepository;
        //private readonly ILogSlideShowRepository _logSlideShowRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        #endregion

        #region Constructor
        public SlideShowService(
            Domain.Interfaces.ISlideShowRepository slideShowRepository,
            IUnitOfWork unitOfWork,
            //ILogSlideShowRepository logSlideShowRepository,
            Cloudinary cloudinary,
            IConfiguration configuration
        )
        {   _slideShowRepository = slideShowRepository;
            _unitOfWork = unitOfWork;
            //_logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
        }
        #endregion
        public async Task<IEnumerable<GetSlideShowResponse>> GetAllSlideShowsAsync()
        {
            var slideShows = await _slideShowRepository.GetAllSlideShowsAsync();

            return GetSlideShowResponseMapper.GetSlideShowListMapEntityToDTO(slideShows);
        }

        public async Task<GetSlideShowResponse?> GetSlideShowByIdAsync(Guid id)
        {
            var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(id) ?? throw new KeyNotFoundException("SlideShow khong ton tai !");
            
            return GetSlideShowResponseMapper.GetSlideShowMapEntityToDTO(slideShow);
        }
    }
}
