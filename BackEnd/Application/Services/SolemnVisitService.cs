using Application.Extension;
using Application.Interfaces;
using Application.Mapper.SolemnVisits.Output;
using Application.Mapper.SolemnVisits.Input;
using CloudinaryDotNet;
using Domain;
using Domain.Interfaces;
using Domain.Localization;
using KLN.Shared.CrossCuttingConcerns;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using KLN.Shared.CrossCuttingConcerns.Utils;
using Domain.Entities;

namespace Application.Services
{
    public class SolemnVisitService(
        ISolemnVisitRepository _solemnVisitRepository,
        ILogSolemnVisitRepository _logSolemnVisitRepository,
        IConfiguration _configuration,
        IUnitOfWork _unitOfWork,
        Cloudinary _cloudinary,
        IStringLocalizer<KLNSharedResources> _localizer
        ) : ISolemnVisitService
    {
        public async Task<PaginationResponseDto<GetSolemnVisitResponse>> GetAllSolemnVisitsAsync(GetSolemnVisitRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var solemnVisits = await _solemnVisitRepository.GetAllSolemnVisitsAsync(page, fetch);
            var totalSolemnVisit = await _solemnVisitRepository.CountSolemnVisitAsync();
            var solemnVisitMapper = GetSolemnVisitResponseMapper.GetSolemnVisitListMapEntityToDTO(solemnVisits);
            return new PaginationResponseDto<GetSolemnVisitResponse>(totalSolemnVisit, solemnVisitMapper);
        }
        public async Task<GetSolemnVisitResponse?> GetSolemnVisitByIdAsync(Guid id)
        {
            var solemnVisit = await _solemnVisitRepository.GetSolemnVisitByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SolemnVisit"]));

            return GetSolemnVisitResponseMapper.GetSolemnVisitMapEntityToDTO(solemnVisit);

        }

        public async Task<GetSolemnVisitResponse> CreateSolemnVisitAsync(AddSolemnVisitRequest request)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Check for duplicate solemn visit name (if needed)
                    var existing = await _solemnVisitRepository.GetSolemnVisitByNameAsync(request.Name);
                    if (existing != null)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["SolemnVisitName"]));
                    }

                    Guid newGuid = Guid.NewGuid();
                    var portraitPublicId = $"Portrait_{newGuid}";
                    var letterPublicId = $"Letter_{newGuid}";
                    var assetFolder = CommonCloudinaryAttribute.assetFolderSolemnVisit;

                    var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.JPG, CommonFileType.PNG, CommonFileType.GIF, CommonFileType.BMP, CommonFileType.WEBP, CommonFileType.SVG, CommonFileType.TIFF };

                    // Validate Portrait Image
                    if (!FileOperations.CheckFileType(allowedContentTypes, request.PortraitImage))
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(
                            _localizer["InvalidFileType"],
                            string.Join(", ", allowedContentTypes))
                        );
                    }

                    // Validate Letter Image
                    if (!FileOperations.CheckFileType(allowedContentTypes, request.LetterImage))
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(
                            _localizer["InvalidFileType"],
                            string.Join(", ", allowedContentTypes))
                        );
                    }


                    // Save to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var portraitPath = await FileOperations.SaveFileToLocal(folderPath, request.PortraitImage);
                    var letterPath = await FileOperations.SaveFileToLocal(folderPath, request.LetterImage);

                    // Upload to Cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    var portraitResult = cloudinaryOperations.UploadFileFromLocalToCloudinary(portraitPath, assetFolder, portraitPublicId)
                        ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);

                    var letterResult = cloudinaryOperations.UploadFileFromLocalToCloudinary(letterPath, assetFolder, letterPublicId)
                        ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);

                    var portraitUrl = portraitResult["secure_url"]?.ToString()
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "portrait secure_url"));

                    var letterUrl = letterResult["secure_url"]?.ToString()
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "letter secure_url"));

                    // Clean up local files
                    FileOperations.DeleteFileFromLocal(portraitPath, folderPath);
                    FileOperations.DeleteFileFromLocal(letterPath, folderPath);

                    // Map to entity
                    var entity = AddSolemnVisitRequestMapper.AddSolemnVisitMapDTOToEntity(request, "", portraitUrl, letterUrl, newGuid);
                    await uow.TrackEntity(entity);
                    await _solemnVisitRepository.CreateSolemnVisitAsync(entity);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    var added = await _solemnVisitRepository.GetSolemnVisitByIdAsync(entity.VisitId)
                        ?? throw new InvalidOperationException(_localizer["AddSolemnVisitFailed"]);

                    return GetSolemnVisitResponseMapper.GetSolemnVisitMapEntityToDTO(added);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetSolemnVisitResponse> UpdateSolemnVisitAsync(Guid id, UpdateSolemnVisitRequest request)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var solemnVisit = await _solemnVisitRepository.GetSolemnVisitByIdAsync(id)
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SolemnVisit"]));
                    await uow.TrackEntity(solemnVisit);

                    // Check for duplicate name
                    var existing = await _solemnVisitRepository.GetSolemnVisitByNameAsync(request.Name);
                    if (existing != null && existing.VisitId != id)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["SolemnVisitName"]));
                    }

                    var assetFolder = CommonCloudinaryAttribute.assetFolderSolemnVisit;
                    var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.JPG, CommonFileType.PNG, CommonFileType.GIF, CommonFileType.BMP, CommonFileType.WEBP, CommonFileType.SVG, CommonFileType.TIFF };

                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");

                    // Update PortraitImage if provided
                    if (request.PortraitImage != null)
                    {
                        if (!FileOperations.CheckFileType(allowedContentTypes, request.PortraitImage))
                        {
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], string.Join(", ", allowedContentTypes)));
                        }

                        var portraitPath = await FileOperations.SaveFileToLocal(folderPath, request.PortraitImage);
                        var portraitPublicId = $"Portrait_{id}";
                        var portraitResult = cloudinaryOperations.UploadFileFromLocalToCloudinary(portraitPath, assetFolder, portraitPublicId)
                            ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var portraitUrl = portraitResult["secure_url"]?.ToString()
                            ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "portrait secure_url"));
                        FileOperations.DeleteFileFromLocal(portraitPath, folderPath);

                        solemnVisit.PortraitImage = portraitUrl;
                    }

                    // Update LetterImage if provided
                    if (request.LetterImage != null)
                    {
                        if (!FileOperations.CheckFileType(allowedContentTypes, request.LetterImage))
                        {
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], string.Join(", ", allowedContentTypes)));
                        }

                        var letterPath = await FileOperations.SaveFileToLocal(folderPath, request.LetterImage);
                        var letterPublicId = $"Letter_{id}";
                        var letterResult = cloudinaryOperations.UploadFileFromLocalToCloudinary(letterPath, assetFolder, letterPublicId)
                            ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var letterUrl = letterResult["secure_url"]?.ToString()
                            ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "letter secure_url"));
                        FileOperations.DeleteFileFromLocal(letterPath, folderPath);

                        solemnVisit.LetterImage = letterUrl;
                    }

                    // Update basic fields
                    solemnVisit.Name = request.Name;
                    solemnVisit.UserId = request.UserId;

                    // Add log
                    var newLog = new LogSolemnVisit
                    {
                        LogSolemnId = 0,
                        Name = solemnVisit.Name,
                        PortraitImage = solemnVisit.PortraitImage,
                        LetterImage = solemnVisit.LetterImage,
                        CreateDate = solemnVisit.CreateDate,
                        UpdateDate = DateTime.Now,
                        UserId = solemnVisit.UserId,
                        VisitId = solemnVisit.VisitId,
                        Flag = false,
                        Process = ProcessMethod.UPDATE
                    };

                    await _logSolemnVisitRepository.CreateLogSolemnVisitAsync(newLog);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    var updated = await _solemnVisitRepository.GetSolemnVisitByIdAsync(id)
                        ?? throw new InvalidOperationException(_localizer["UpdateSolemnVisitFailed"]);

                    return GetSolemnVisitResponseMapper.GetSolemnVisitMapEntityToDTO(updated);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }
        public async Task<bool> DeleteMultipleSolemnVisitAsync(List<Guid> ids)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Get all solemn visits by IDs
                    var solemnVisits = await _solemnVisitRepository.GetSolemnVisitByIdsAsync(ids)
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SolemnVisit"]));

                    if (!solemnVisits.Any())
                    {
                        throw new KeyNotFoundException(_localizer["NoSolemnVisitRecordsFound"]);
                    }

                    // Create log entries
                    var logEntries = solemnVisits.Select(visit => new LogSolemnVisit
                    {
                        // Do NOT assign logSolemnId — it's auto-generated
                        VisitId = visit.VisitId,
                        Name = visit.Name,
                        PortraitImage = visit.PortraitImage,
                        LetterImage = visit.LetterImage,
                        CreateDate = visit.CreateDate,
                        UserId = visit.UserId,
                        Process = ProcessMethod.DELETE,
                        UpdateDate = DateTime.Now,
                        Flag = false
                    }).ToList();

                    await _logSolemnVisitRepository.CreateLogSolemVisitRangeAsync(logEntries);

                    // Perform soft delete
                    await _solemnVisitRepository.SoftDeleteMultipleSolemnVisitByIdsAsync(ids);

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
