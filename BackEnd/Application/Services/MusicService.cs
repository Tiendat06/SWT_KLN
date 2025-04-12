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
        private readonly ILogMusicRepository _logMusicRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public MusicService(
            IMusicRepository musicRepository,
            IUnitOfWork unitOfWork,
             ILogMusicRepository logMusicRepository,
            Cloudinary cloudinary,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _musicRepository = musicRepository;
            _unitOfWork = unitOfWork;
            _logMusicRepository = logMusicRepository;
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

        public async Task<GetTotalMusicResponse> GetTotalMusicAsync(GetTotalMusicRequest input)
        {
            var mediaType = input.Type;
            var count = await _musicRepository.CountMusicAsync(mediaType);
            return new GetTotalMusicResponse
            {
                TotalMusic = count
            };
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
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var musicEntity = await _musicRepository.GetMusicByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Music"]));
                    await uow.TrackEntity(musicEntity);

                    // Update Music
                    musicEntity.Title = updateMusicRequest.Title;
                    musicEntity.ImageLink = updateMusicRequest.ImageLink != null ? musicEntity.ImageLink : musicEntity.ImageLink;
                    musicEntity.AudioLink = updateMusicRequest.AudioLink != null ? musicEntity.AudioLink : musicEntity.AudioLink;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    // Upload new image if provided
                    if (updateMusicRequest.ImageLink != null)
                    {
                        // Check file type
                        var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG };
                        var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, updateMusicRequest.ImageLink) == false 
                                ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                        // Add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePathImage = await FileOperations.SaveMultipleFileToLocal(folderPath, updateMusicRequest.ImageLink);
                        //var filePathAudio = await FileOperations.SaveMultipleFileToLocal(folderPath, updateMusicRequest.AudioLink);
                        Console.WriteLine($"Saved updated image to: {filePathImage}");

                        // Upload to cloudinary
                        var assetFolderImage = CommonCloudinaryAttribute.assetFolderMusicImage;
                        var publicId = $"{nameof(Music)}_{id}";
                        var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var musicImage = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // Delete file from local
                        var isDeletedImage = FileOperations.DeleteFileFromLocal(filePathImage, folderPath);
                        Console.WriteLine($"Updated image to: {musicImage}");

                        // Update image link
                        musicEntity.ImageLink = musicImage;
                    }

                    // Upload new audio if provided
                    if (updateMusicRequest.AudioLink != null)
                    {
                        // Add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePathAudio = await FileOperations.SaveMultipleFileToLocal(folderPath, updateMusicRequest.AudioLink);
                        Console.WriteLine($"Saved updated audio to: {filePathAudio}");

                        // Upload to cloudinary
                        var assetFolderAudioMP3 = CommonCloudinaryAttribute.assetFolderMusicAudioMP3;
                        var publicId = $"{nameof(Music)}_{id}";
                        var resultAudio = cloudinaryOperations.UploadMusicFileToCloudinary(filePathAudio, assetFolderAudioMP3, publicId) ?? throw new InvalidOperationException(_localizer["UploadAudioCloudinaryFailed"]);
                        Console.WriteLine($"Result Audio: {resultAudio}");
                        var musicAudio = resultAudio["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // Delete file from local
                        var isDeletedAudio = FileOperations.DeleteFileFromLocal(filePathAudio, folderPath);
                        Console.WriteLine($"Updated audio to: {musicAudio}");

                        // Update audio link
                        musicEntity.AudioLink = musicAudio;
                    }

                    // If you have a log repository for music, you can add logging here
                    // Similar to your Magazine implementation
                    var newLogMusic = new LogMusic
                    {
                        LogMusicId = 0,
                        Title = musicEntity.Title,
                        ImageLink = musicEntity.ImageLink,
                        CreateDate = musicEntity.CreateDate,
                        AudioLink = musicEntity.AudioLink,
                        UserId = musicEntity.UserId,
                        MusicId = musicEntity.MusicId,
                        Process = "UPDATE",
                    };
                    await _logMusicRepository.CreateLogMusicAsync(newLogMusic);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetMusicResponseMapper.GetMusicMapEntityToDTO(musicEntity);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Update music error: {ex.Message}");
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["UpdateMusicFailed"]);
                }
            }
        }

        public async Task<bool> DeleteMultipleMusicAsync(List<Guid> ids)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Fetch all music entities once for logging
                    Console.WriteLine($"ids: {ids}");
                    var musicEntities = await _musicRepository.GetMusicByIdsAsync(ids);
                    Console.WriteLine($"Fetched {musicEntities?.Count() ?? 0} music records for deletion.");
                    if (musicEntities == null || !musicEntities.Any())
                    {
                        throw new KeyNotFoundException(_localizer["NoMusicRecordsFound"]);
                    }

                    // Create deletion log entries
                    var logEntries = musicEntities.Select(music => new LogMusic
                    {
                        LogMusicId = 0,
                        Title = music.Title,
                        ImageLink = music.ImageLink,
                        CreateDate = music.CreateDate,
                        AudioLink = music.AudioLink,
                        UserId = music.UserId,
                        MusicId = music.MusicId,
                        Process = "DELETE",
                    }).ToList();

                    await _logMusicRepository.CreateLogMusicRangeAsync(logEntries);

                    // Perform soft deletion directly in repository by IDs
                    await _musicRepository.SoftDeleteMultipleMusicByIdsAsync(ids);

                    // Save and commit
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Delete multiple music error: {ex.Message}");
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["DeleteMusicFailed"]);
                }
            }
        }
    }
}
