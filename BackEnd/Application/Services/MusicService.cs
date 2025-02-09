using Application.DTOs.Music.Output;
using Application.Interfaces;
using Application.Mapper.Musics.Output;
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
    public class MusicService : IMusicService
    {
        #region Fields
        private readonly IMusicRepository _musicRepository;
        //private readonly ILogMusicRepository _logMusicRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        #endregion
        #region Constructor
        public MusicService(
            IMusicRepository musicRepository,
            IUnitOfWork unitOfWork,
            //ILogMusicRepository logMusicRepository,
            Cloudinary cloudinary,
            IConfiguration configuration
        )
        {
            _musicRepository = musicRepository;
            _unitOfWork = unitOfWork;
            //_logMusicRepository = logMusicRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
        }
        #endregion
        public async Task<IEnumerable<GetMusicResponse>> GetAllMusicAsync()
        {
            var musics = await _musicRepository.GetAllMusicAsync();
            return GetMusicResponseMapper.GetMusicListMapEntityToDTO(musics);
        }
        public async Task<GetMusicResponse?> GetMusicByIdAsync(Guid id)
        {
            var music = await _musicRepository.GetMusicByIdAsync(id) ?? throw new KeyNotFoundException("Music khong ton tai !");
            return GetMusicResponseMapper.GetMusicMapEntityToDTO(music);
        }
    }
}
