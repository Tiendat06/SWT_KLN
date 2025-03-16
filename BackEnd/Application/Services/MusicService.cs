using Application.Interfaces;
using Application.Mapper.Musics.Output;
using Domain;
using Domain.Interfaces;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;

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
        IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public MusicService(
            IMusicRepository musicRepository,
            IUnitOfWork unitOfWork,
            //ILogMusicRepository logMusicRepository,
            Cloudinary cloudinary,
            IConfiguration configuration,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _musicRepository = musicRepository;
            _unitOfWork = unitOfWork;
            //_logMusicRepository = logMusicRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
            _localizer = localizer;
        }
        #endregion
        public async Task<PaginationResponseDto<GetMusicResponse>> GetAllMusicAsync(GetMusicRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var type = input.Type;
            var musics = await _musicRepository.GetAllMusicAsync(fetch, page, type);
            var totalMusic = await _musicRepository.CountMusicAsync(type);
            var musicMapper = GetMusicResponseMapper.GetMusicListMapEntityToDTO(musics);
            return new PaginationResponseDto<GetMusicResponse>(totalMusic, musicMapper);
        }

        public async Task<GetMusicResponse?> GetMusicByIdAsync(Guid id)
        {
            var music = await _musicRepository.GetMusicByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Music"]));
            return GetMusicResponseMapper.GetMusicMapEntityToDTO(music);
        }
    }
}
