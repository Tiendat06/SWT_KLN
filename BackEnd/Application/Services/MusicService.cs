using Application.Extension;
using Application.Interfaces;
using Application.Mapper.Musics.Input;
using Application.Mapper.Musics.Output;
using KLN.Shared.CrossCuttingConcerns.Utils;
using CloudinaryDotNet;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Localization;
using KLN.Shared.CrossCuttingConcerns;
using Microsoft.Extensions.Localization;

namespace Application.Services
{
    public class MusicService : IMusicService
    {
        #region Fields
        private readonly IMusicRepository _musicRepository;
        // private readonly ILogMusicRepository _logMusicRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public MusicService(
            IMusicRepository musicRepository,
            IUnitOfWork unitOfWork,
            // ILogMusicRepository logMusicRepository,
            Cloudinary cloudinary,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _musicRepository = musicRepository;
            _unitOfWork = unitOfWork;
            // _logMusicRepository = logMusicRepository;
            _cloudinary = cloudinary;
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
        
        public async Task<GetMusicResponse> CreateMusicAsync(AddMusicRequest addMusicRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync()) 
            {
                try
                {
                    Guid newGuid = Guid.NewGuid();
                    var assetFolderImage = CommonCloudinaryAttribute.assetFolderMusicImage;
                    var assetFolderAudioMP3 = CommonCloudinaryAttribute.assetFolderMusicAudioMP3;
                    var assetFolderAudioWMA = CommonCloudinaryAttribute.assetFolderMusicAudioWMA;
                    var publicId = $"{nameof(Music)}_{newGuid}";
                    var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG };

                    // upload Image
                    // check file type
                    //var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, addMusicRequest.ImageLink);

                    //add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePathImage = await FileOperations.SaveMultipleFileToLocal(folderPath, addMusicRequest.ImageLink);
                    var filePathAudio = await FileOperations.SaveMultipleFileToLocal(folderPath, addMusicRequest.AudioLink);
                    Console.WriteLine($"Saved image to: {filePathImage}");
                    Console.WriteLine($"Saved audio to: {filePathAudio}");

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                    var musicImage = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));
                    var resultAudio = cloudinaryOperations.UploadMusicFileToCloudinary(filePathAudio, assetFolderAudioMP3, publicId) ?? throw new InvalidOperationException(_localizer["UploadAudioCloudinaryFailed"]);
                    Console.WriteLine($"Result Audio: {resultAudio}");
                    var musicAudio = resultAudio["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                    // delete file and folder from local
                    var isDeletedImage = FileOperations.DeleteFileFromLocal(filePathImage, folderPath);
                    var isDeletedAudio = FileOperations.DeleteFileFromLocal(filePathAudio, folderPath);

                    Console.WriteLine($"Upload image to: {musicImage}");
                    Console.WriteLine($"Upload audio to: {musicAudio}");


                    // map from DTO to entity
                    var addMusicMapperDTOToEntity = AddMusicRequestMapper.AddMusicMapDTOToEntity(addMusicRequest, musicImage, musicAudio, newGuid);
                    await uow.TrackEntity(addMusicMapperDTOToEntity);
                    await _musicRepository.CreateMusicAsync(addMusicMapperDTOToEntity);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    var addedMusic = await _musicRepository.GetMusicByIdAsync(newGuid) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Music"]));
                    return GetMusicResponseMapper.GetMusicMapEntityToDTO(addedMusic);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["AddMusicFailed"]);
                }
            }
        }

        public async Task<GetMusicResponse> UpdateMusicAsync(Guid id, UpdateMusicRequest updateMusicRequest)
        {
            throw new NotImplementedException();
        }
    }
}
