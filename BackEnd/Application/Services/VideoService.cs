using Application.DTOs.Video.Output;
using Application.Interfaces;
using Application.Mapper.Videos.Output;
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
using Microsoft.Extensions.Localization;
using Domain.Localization;
using Application.DTOs;

namespace Application.Services
{
    public class VideoService : IVideoService
    {
        #region Fields
        private readonly Domain.Interfaces.IVideoRepository _videoRepository;
        //private readonly ILogSlideImageRepository _logSlideImageRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public VideoService(
            Domain.Interfaces.IVideoRepository videoRepository,
            IUnitOfWork unitOfWork,
            //ILogSlideShowRepository logSlideShowRepository,
            Cloudinary cloudinary,
            IConfiguration configuration,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _videoRepository = videoRepository;
            _unitOfWork = unitOfWork;
            //_logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
            _localizer = localizer;
        }
        #endregion
        public async Task<IEnumerable<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var videos = await _videoRepository.GetAllVideosAsync(page, fetch);
            return GetVideoResponseMapper.GetVideoListMapEntityToDTO(videos);
        }
        public async Task<GetVideoResponse?> GetVideoByIdAsync(Guid id)
        {
            var video = await _videoRepository.GetVideoByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Video"]));
            return GetVideoResponseMapper.GetVideoMapEntityToDTO(video);
        }

    }
}
