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
        #endregion
        #region Constructor
        public VideoService(
            Domain.Interfaces.IVideoRepository videoRepository,
            IUnitOfWork unitOfWork,
            //ILogSlideShowRepository logSlideShowRepository,
            Cloudinary cloudinary,
            IConfiguration configuration
        )
        {
            _videoRepository = videoRepository;
            _unitOfWork = unitOfWork;
            //_logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
        }
        #endregion
        public async Task<IEnumerable<GetVideoResponse>> GetAllVideosAsync()
        {
            var videos = await _videoRepository.GetAllVideosAsync();
            return GetVideoResponseMapper.GetVideoListMapEntityToDTO(videos);
        }
        public async Task<GetVideoResponse?> GetVideoByIdAsync(Guid id)
        {
            var video = await _videoRepository.GetVideoByIdAsync(id) ?? throw new KeyNotFoundException("Video khong ton tai !");
            return GetVideoResponseMapper.GetVideoMapEntityToDTO(video);
        }

    }
}
