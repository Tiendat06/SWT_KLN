﻿using Application.Extension;
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
    public class MusicService(
        IMusicRepository _musicRepository,
        ILogMusicRepository _logMusicRepository,
        IUnitOfWork _unitOfWork,
        Cloudinary _cloudinary,
        IStringLocalizer<KLNSharedResources> _localizer
        ) : IMusicService
    {
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
                    // Check for duplicate title
                    var existingMusic = await _musicRepository.GetMusicByTitleAsync(addMusicRequest.Title);
                    if (existingMusic != null)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["MusicTitle"]));
                    }

                    Guid newGuid = Guid.NewGuid();
                    var assetFolderImage = CommonCloudinaryAttribute.assetFolderMusicImage;
                    var assetFolderAudioMP3 = CommonCloudinaryAttribute.assetFolderMusicAudioMP3;
                    var assetFolderAudioWMA = CommonCloudinaryAttribute.assetFolderMusicAudioWMA;
                    var publicId = $"{nameof(Music)}_{newGuid}";
                    var allowedContentTypesAudio = new[] { CommonFileType.MP3, CommonFileType.WAV, CommonFileType.OGG };
                    var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG, CommonFileType.JPG, CommonFileType.GIF, CommonFileType.BMP, CommonFileType.WEBP, CommonFileType.SVG, CommonFileType.TIFF };

                    // upload Image
                    // check file type
                    var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, addMusicRequest.ImageLink) == false ? 
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}, {CommonFileType.JPG}, {CommonFileType.GIF}, {CommonFileType.BMP}, {CommonFileType.WEBP}, {CommonFileType.SVG}, {CommonFileType.TIFF}")) : true;
                    var isAllowedAudio = FileOperations.CheckFileType(allowedContentTypesAudio, addMusicRequest.AudioLink) == false ? 
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.MP3}, {CommonFileType.WAV}, {CommonFileType.OGG}")) : true;

                    //add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePathImage = await FileOperations.SaveFileToLocal(folderPath, addMusicRequest.ImageLink);
                    var filePathAudio = await FileOperations.SaveFileToLocal(folderPath, addMusicRequest.AudioLink);
                    //Console.WriteLine($"Saved image to: {filePathImage}");
                    //Console.WriteLine($"Saved audio to: {filePathAudio}");

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                    var musicImage = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));
                    var resultAudio = cloudinaryOperations.UploadRawFileToCloudinary(filePathAudio, assetFolderAudioMP3, publicId) ?? throw new InvalidOperationException(_localizer["UploadAudioCloudinaryFailed"]);
                    //Console.WriteLine($"Result Audio: {resultAudio}");
                    var musicAudio = resultAudio["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                    // delete file and folder from local
                    var isDeletedImage = FileOperations.DeleteFileFromLocal(filePathImage, folderPath);
                    var isDeletedAudio = FileOperations.DeleteFileFromLocal(filePathAudio, folderPath);

                    //Console.WriteLine($"Upload image to: {musicImage}");
                    //Console.WriteLine($"Upload audio to: {musicAudio}");


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
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetMusicResponse> UpdateMusicAsync(Guid id, UpdateMusicRequest updateMusicRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Check for duplicate title (ignore current music's title)
                    var existingMusic = await _musicRepository.GetMusicByTitleAsync(updateMusicRequest.Title);
                    if (existingMusic != null && existingMusic.MusicId != id)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["MusicTitle"]));
                    }

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
                        var allowedContentTypesAudio = new[] { CommonFileType.MP3, CommonFileType.WAV, CommonFileType.OGG };
                        var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG, CommonFileType.JPG, CommonFileType.GIF, CommonFileType.BMP, CommonFileType.WEBP, CommonFileType.SVG, CommonFileType.TIFF };

                        // check file type
                        var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, updateMusicRequest.ImageLink) == false ?
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}, {CommonFileType.JPG}, {CommonFileType.GIF}, {CommonFileType.BMP}, {CommonFileType.WEBP}, {CommonFileType.SVG}, {CommonFileType.TIFF}")) : true;
                        var isAllowedAudio = FileOperations.CheckFileType(allowedContentTypesAudio, updateMusicRequest.AudioLink) == false ?
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.MP3}, {CommonFileType.WAV}, {CommonFileType.OGG}")) : true;

                        // Add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePathImage = await FileOperations.SaveFileToLocal(folderPath, updateMusicRequest.ImageLink);
                        //var filePathAudio = await FileOperations.SaveMultipleFileToLocal(folderPath, updateMusicRequest.AudioLink);
                        //Console.WriteLine($"Saved updated image to: {filePathImage}");

                        // Upload to cloudinary
                        var assetFolderImage = CommonCloudinaryAttribute.assetFolderMusicImage;
                        var publicId = $"{nameof(Music)}_{id}";
                        var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var musicImage = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // Delete file from local
                        var isDeletedImage = FileOperations.DeleteFileFromLocal(filePathImage, folderPath);
                        //Console.WriteLine($"Updated image to: {musicImage}");

                        // Update image link
                        musicEntity.ImageLink = musicImage;
                    }

                    // Upload new audio if provided
                    if (updateMusicRequest.AudioLink != null)
                    {
                        // Add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePathAudio = await FileOperations.SaveFileToLocal(folderPath, updateMusicRequest.AudioLink);
                        //Console.WriteLine($"Saved updated audio to: {filePathAudio}");

                        // Upload to cloudinary
                        var assetFolderAudioMP3 = CommonCloudinaryAttribute.assetFolderMusicAudioMP3;
                        var publicId = $"{nameof(Music)}_{id}";
                        var resultAudio = cloudinaryOperations.UploadRawFileToCloudinary(filePathAudio, assetFolderAudioMP3, publicId) ?? throw new InvalidOperationException(_localizer["UploadAudioCloudinaryFailed"]);
                        //Console.WriteLine($"Result Audio: {resultAudio}");
                        var musicAudio = resultAudio["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // Delete file from local
                        var isDeletedAudio = FileOperations.DeleteFileFromLocal(filePathAudio, folderPath);
                        //Console.WriteLine($"Updated audio to: {musicAudio}");

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
                        Process = ProcessMethod.UPDATE,
                    };
                    await _logMusicRepository.CreateLogMusicAsync(newLogMusic);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetMusicResponseMapper.GetMusicMapEntityToDTO(musicEntity);
                }
                catch (Exception ex)
                {
                    //Console.WriteLine($"Update music error: {ex.Message}");
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
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
                    var musicEntities = await _musicRepository.GetMusicByIdsAsync(ids);
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
                        Process = ProcessMethod.DELETE,
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
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }
    }
}
