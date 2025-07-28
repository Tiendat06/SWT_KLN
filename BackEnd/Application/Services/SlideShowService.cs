using Application.Interfaces;
using Application.Mapper.SlideShows.Output;
using Domain;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns;
using Application.Mapper.SlideShows.Input;
using KLN.Shared.CrossCuttingConcerns.Utils;
using Domain.Entities;
using System.Text.Json;

namespace Application.Services
{
    public class SlideShowService(
        ISlideShowRepository _slideShowRepository,
        ILogSlideShowRepository _logSlideShowRepository,
        IConfiguration _configuration,
        IUnitOfWork _unitOfWork,
        Cloudinary _cloudinary,
        IStringLocalizer<KLNSharedResources> _localizer
        ) : ISlideShowService
    {
        public async Task<PaginationResponseDto<GetSlideShowResponse>> GetAllSlideShowsAsync(GetSlideShowRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var mediaType = input.Type;
            var slideShowType = input.SlideShowType;
            var slideShows = await _slideShowRepository.GetAllSlideShowsAsync(page, fetch, mediaType, slideShowType);
            var totalSlideShow = await _slideShowRepository.CountSlideShowAsync(mediaType, slideShowType);
            var slideShowsMapper = GetSlideShowResponseMapper.GetSlideShowListMapEntityToDTO(slideShows);
            return new PaginationResponseDto<GetSlideShowResponse>(totalSlideShow, slideShowsMapper);
        }

        public async Task<GetSlideShowResponse?> GetSlideShowByIdAsync(Guid id)
        {
            var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SlideShow"]));

            return GetSlideShowResponseMapper.GetSlideShowMapEntityToDTO(slideShow);
        }

        public async Task<GetTotalSlideImageResponse> CountSlideImagePerSlideShowAsync(GetSlideShowRequest input)
        {
            int type = input.Type;
            int slideShowType = input.SlideShowType;
            var count = await _slideShowRepository.CountSlideImageInSpecificSlideShow(type, slideShowType);
            return new GetTotalSlideImageResponse
            {
                TotalSlideImage = count,
            };
        }

        public async Task<GetSlideShowResponse> CreateSlideShowAsync(AddSlideShowRequest addSlideShowRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Check for duplicate title
                    var existingSlideShow = await _slideShowRepository.GetSlideShowByTitleAsync(addSlideShowRequest.Title);
                    if (existingSlideShow != null)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["SlideShowTitle"]));
                    }

                    Guid newGuid = Guid.NewGuid();
                    var assetFolderImage = CommonCloudinaryAttribute.assetFolderSlideImage;
                    var publicId = $"{nameof(SlideShow)}_{newGuid}";
                    var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG };

                    // check file type
                    var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, addSlideShowRequest.Image) == false ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                    // add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePathImage = await FileOperations.SaveFileToLocal(folderPath, addSlideShowRequest.Image);

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                    var slideShowImage = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                    // delete file and folder from local
                    FileOperations.DeleteFileFromLocal(filePathImage, folderPath);

                    // handle slide image
                    List<(string ImageUrl, string Capture)> slideImagesList = new List<(string, string)>();
                    if (addSlideShowRequest.SlideImage != null && addSlideShowRequest.SlideImage.Any())
                    {
                        foreach (var slideImageRequest in addSlideShowRequest.SlideImage)
                        {
                            // Check file slide image
                            if (!FileOperations.CheckFileType(allowedContentTypesImage, slideImageRequest.SlideImage))
                            {
                                throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}"));
                            }
                            // add file to local
                            var slideFilePath = await FileOperations.SaveFileToLocal(folderPath, slideImageRequest.SlideImage);
                            var slidePublicId = $"{publicId}_{Guid.NewGuid()}";

                            // Upload slide image to Cloudinary
                            var resultSlideImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(slideFilePath, assetFolderImage, slidePublicId)
                                                   ?? throw new InvalidOperationException(_localizer["UploadSlideImageCloudinaryFailed"]);
                            var slideImageUrl = resultSlideImage["secure_url"]?.ToString()
                                                 ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                            slideImagesList.Add((slideImageUrl, slideImageRequest.Capture));

                            // delete file and folder from local
                            FileOperations.DeleteFileFromLocal(slideFilePath, folderPath);
                        }
                    }

                    // map from DTO to entity
                    var slideShowEntity = AddSlideShowRequestMapper.AddSlideShowMapDTOToEntity(addSlideShowRequest, slideShowImage, slideImagesList, newGuid);
                    await uow.TrackEntity(slideShowEntity);
                    await _slideShowRepository.CreateSlideShowAsync(slideShowEntity);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    var addedSlideShow = await _slideShowRepository.GetSlideShowByIdAsync(newGuid)
                                         ?? throw new InvalidOperationException(_localizer["AddSlideShowFailed"]);
                    return GetSlideShowResponseMapper.GetSlideShowMapEntityToDTO(addedSlideShow);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetSlideShowResponse> UpdateSlideShowAsync(Guid id, UpdateSlideShowRequest updateSlideShowRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Check for duplicate title (ignore current slideShow's title)
                    var existingSlideShow = await _slideShowRepository.GetSlideShowByTitleAsync(updateSlideShowRequest.Title);
                    if (existingSlideShow != null && existingSlideShow.SlideShowId != id)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["SlideShowTitle"]));
                    }

                    var slideShowEntity = await _slideShowRepository.GetSlideShowByIdAsync(id)
                        ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SlideShow"]));

                    await uow.TrackEntity(slideShowEntity);

                    slideShowEntity.Title = updateSlideShowRequest.Title;
                    slideShowEntity.Description = updateSlideShowRequest.Description;
                    slideShowEntity.MediaTypeId = updateSlideShowRequest.MediaTypeId;
                    slideShowEntity.SlideShowTypeId = updateSlideShowRequest.SlideShowTypeId;

                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    if (updateSlideShowRequest.Image != null)
                    {
                        var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG };
                        if (!FileOperations.CheckFileType(allowedContentTypes, updateSlideShowRequest.Image))
                        {
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}"));
                        }

                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, updateSlideShowRequest.Image);

                        var assetFolder = CommonCloudinaryAttribute.assetFolderSlideImage;
                        var publicId = $"{nameof(SlideShow)}_{id}";

                        var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId)
                            ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);

                        var secureUrl = resultUpload["secure_url"]?.ToString()
                            ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        slideShowEntity.Image = secureUrl;
                    }
                    // handle slide image
                    if (updateSlideShowRequest.SlideImage != null && updateSlideShowRequest.SlideImage.Any())
                    {
                        var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG };
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        List<(string ImageUrl, string Capture)> slideImagesList = new List<(string, string)>();

                        foreach (var slideImageRequest in updateSlideShowRequest.SlideImage)
                        {
                            if (!FileOperations.CheckFileType(allowedContentTypes, slideImageRequest.SlideImage))
                            {
                                throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}"));
                            }

                            var slideFilePath = await FileOperations.SaveFileToLocal(folderPath, slideImageRequest.SlideImage);
                            var slidePublicId = $"{nameof(Domain.Entities.SlideShow)}_{id}_{Guid.NewGuid()}";
                            var assetFolder = CommonCloudinaryAttribute.assetFolderSlideImage;

                            var resultSlideImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(slideFilePath, assetFolder, slidePublicId)
                                ?? throw new InvalidOperationException(_localizer["UploadSlideImageCloudinaryFailed"]);

                            var slideImageUrl = resultSlideImage["secure_url"]?.ToString()
                                ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                            // delete file from local
                            FileOperations.DeleteFileFromLocal(slideFilePath, folderPath);

                            slideImagesList.Add((slideImageUrl, slideImageRequest.Capture));
                        }

                        // Serialize slide image
                        slideShowEntity.SlideImage = JsonSerializer.Serialize(
                            slideImagesList.Select((img, index) => new GetSlideImageResponse
                            {
                                Id = index + 1,
                                Capture = img.Capture,
                                ImageLink = img.ImageUrl
                            })
                        );
                    }

                    slideShowEntity.LogSlideShows ??= new List<LogSlideShow>();
                    slideShowEntity.LogSlideShows.Add(new LogSlideShow
                    {
                        LogSlideShowId = 0,
                        Title = slideShowEntity.Title,
                        Image = slideShowEntity.Image,
                        Description = slideShowEntity.Description,
                        CreateDate = slideShowEntity.CreateDate,
                        SlideImage = slideShowEntity.SlideImage,
                        MediaTypeId = slideShowEntity.MediaTypeId,
                        SlideShowTypeId = slideShowEntity.SlideShowTypeId,
                        UserId = slideShowEntity.UserId,
                        SlideShowId = slideShowEntity.SlideShowId,
                        Process = ProcessMethod.UPDATE,
                    });

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetSlideShowResponseMapper.GetSlideShowMapEntityToDTO(slideShowEntity);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<bool> DeleteSlideShowsAsync(DeleteSlideShowsRequest deleteSlideShowsRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var slideShowIds = deleteSlideShowsRequest.Ids;
                    // check if slide show exists
                    var slideShowEntities = await _slideShowRepository.GetSlideShowsByIdsAsync(slideShowIds);
                    var foundIds = slideShowEntities.Select(x => x.SlideShowId);
                    var notFoundIds = slideShowIds.Except(foundIds).ToList();
                    if (notFoundIds.Any())
                    {
                        throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SlideShow"]));
                    }
                    // log slide show
                    var newLogSlideShows = slideShowEntities.Select(slideShowEntity => new LogSlideShow
                    {
                        LogSlideShowId = 0,
                        Title = slideShowEntity.Title,
                        Image = slideShowEntity.Image,
                        Description = slideShowEntity.Description,
                        CreateDate = slideShowEntity.CreateDate,
                        UserId = slideShowEntity.UserId,
                        SlideShowId = slideShowEntity.SlideShowId,
                        Process = ProcessMethod.DELETE,
                    }).ToList();

                    await _logSlideShowRepository.CreateLogSlideShowsAsync(newLogSlideShows);

                    await _slideShowRepository.SoftDeleteSlideShowsAsync(slideShowEntities.ToList());

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

        public async Task<GetSlideImageResponse> GetSlideImageByIdAsync(Guid slideShowId, int slideImageId)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(slideShowId)
                        ?? throw new InvalidOperationException(_localizer["NotFound"] + _localizer["SlideShowTitle"]);
                    // Deserialize the SlideImage JSON field
                    var slideImageList = string.IsNullOrWhiteSpace(slideShow.SlideImage)
                        ? new List<GetSlideImageResponse>()
                        : JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage!)!;
                    var targetImage = slideImageList.FirstOrDefault(x => x.Id == slideImageId)
                        ?? throw new InvalidOperationException(_localizer["NotFound"] + _localizer["SlideImage"]);
                    return targetImage;
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetSlideImageListResponse> AddSlideImagesAsync(AddSlideImagesRequest request)
        {
            var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, CommonFileType.JPG };

            if (request.SlideImages.Any(img => !FileOperations.CheckFileType(allowedContentTypes, img.ImageLink)))
            {
                throw new ArgumentException(CommonExtensions.GetValidateMessage(
                    _localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}, {CommonFileType.JPG}"));
            }

            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(request.SlideShowId)
                        ?? throw new InvalidOperationException(_localizer["SlideShowNotFound"]);

                    await uow.TrackEntity(slideShow);

                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var cloudinary = new CloudinaryOperations(_cloudinary);

                    var slideImageList = string.IsNullOrWhiteSpace(slideShow.SlideImage)
                        ? new List<GetSlideImageResponse>()
                        : JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage!)!;

                    int imageIndex = slideImageList.Count;

                    // Sort by Id to control upload order
                    var orderedImages = request.SlideImages.OrderBy(i => i.Id).ToList();

                    foreach (var img in orderedImages)
                    {
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, img.ImageLink);
                        var publicId = $"{nameof(SlideShow)}_{request.SlideShowId}_{Guid.NewGuid()}";

                        var uploadResult = cloudinary.UploadFileFromLocalToCloudinary(
                                filePath,
                                CommonCloudinaryAttribute.assetFolderSlideShowImage,
                                publicId)
                            ?? throw new InvalidOperationException(_localizer["UploadSlideImageCloudinaryFailed"]);

                        var secureUrl = uploadResult["secure_url"]?.ToString()
                            ?? throw new KeyNotFoundException(_localizer["NotFound"]);

                        FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        slideImageList.Add(new GetSlideImageResponse
                        {
                            Id = imageIndex++,
                            Capture = img.Capture,
                            ImageLink = secureUrl
                        });
                    }

                    slideShow.SlideImage = JsonSerializer.Serialize(slideImageList);

                    slideShow.LogSlideShows ??= new List<LogSlideShow>();

                    slideShow.LogSlideShows.Add(new LogSlideShow
                    {
                        LogSlideShowId = 0,
                        Title = slideShow.Title,
                        Description = slideShow.Description,
                        CreateDate = DateTime.UtcNow,
                        UpdateDate = DateTime.UtcNow,
                        SlideImage = slideShow.SlideImage,
                        UserId = request.UserId,
                        Process = ProcessMethod.CREATE
                    });

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return new GetSlideImageListResponse { SlideImages = slideImageList };
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetSlideImageListResponse> UpdateSlideImagesAsync(UpdateSlideImagesRequest request)
        {
            var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG };

            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Get SlideShow entity
                    var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(request.SlideShowId)
                        ?? throw new InvalidOperationException(_localizer["SlideShowNotFound"]);

                    await uow.TrackEntity(slideShow);

                    var cloudinary = new CloudinaryOperations(_cloudinary);
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");

                    // Deserialize the SlideImage JSON field
                    var slideImageList = string.IsNullOrWhiteSpace(slideShow.SlideImage)
                        ? new List<GetSlideImageResponse>()
                        : JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage!)!;

                    foreach (var imageRequest in request.SlideImages)
                    {
                        // Check if the image type is correct or not
                        if (!FileOperations.CheckFileType(allowedContentTypes, imageRequest.ImageLink))
                        {
                            throw new ArgumentException(CommonExtensions.GetValidateMessage(
                                _localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}"));
                        }

                        var filePath = await FileOperations.SaveFileToLocal(folderPath, imageRequest.ImageLink);
                        var publicId = $"{nameof(SlideShow)}_{request.SlideShowId}_{Guid.NewGuid()}";

                        var result = cloudinary.UploadFileFromLocalToCloudinary(filePath, CommonCloudinaryAttribute.assetFolderSlideShowImage, publicId)
                            ?? throw new InvalidOperationException(_localizer["UploadSlideImageCloudinaryFailed"]);

                        var secureUrl = result["secure_url"]?.ToString()
                            ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        if (imageRequest.Id > 0)
                        {
                            // Update existing image
                            var existing = slideImageList.FirstOrDefault(x => x.Id == imageRequest.Id)
                                ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], $"ImageId {imageRequest.Id}"));

                            // Delete old image from Cloudinary if needed
                            // var oldPublicId = cloudinary.ExtractPublicIdFromUrl(existing.ImageLink);
                            // cloudinary.DeleteFileFromCloudinary(oldPublicId);

                            existing.ImageLink = secureUrl;
                            existing.Capture = imageRequest.Capture;
                        }
                        else
                        {
                            // Add new image
                            slideImageList.Add(new GetSlideImageResponse
                            {
                                Id = 0, // will be reassigned
                                Capture = imageRequest.Capture,
                                ImageLink = secureUrl
                            });
                        }
                    }

                    // Reindex all IDs in the list
                    for (int i = 0; i < slideImageList.Count; i++)
                    {
                        slideImageList[i].Id = i + 1;
                    }

                    slideShow.SlideImage = JsonSerializer.Serialize(slideImageList);

                    // Log the changed in Update
                    slideShow.LogSlideShows ??= new List<LogSlideShow>();
                    slideShow.LogSlideShows.Add(new LogSlideShow
                    {
                        LogSlideShowId = 0,
                        Title = slideShow.Title,
                        Description = slideShow.Description,
                        CreateDate = DateTime.UtcNow,
                        SlideImage = slideShow.SlideImage,
                        UserId = request.UserId,
                        Process = ProcessMethod.UPDATE
                    });

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return new GetSlideImageListResponse
                    {
                        SlideImages = slideImageList
                    };
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetSlideImageListResponse> DeleteSlideImagesAsync(DeleteSlideImageRequest request)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(request.SlideShowId)
                        ?? throw new InvalidOperationException(_localizer["SlideShowNotFound"]);

                    await uow.TrackEntity(slideShow);

                    var slideImageList = string.IsNullOrWhiteSpace(slideShow.SlideImage)
                        ? new List<GetSlideImageResponse>()
                        : JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage!)!;

                    var imagesToRemove = slideImageList.Where(x => request.Ids.Contains(x.Id)).ToList();
                    if (!imagesToRemove.Any())
                        throw new KeyNotFoundException(_localizer["SlideImageNotFound"]);

                    //var cloudinary = new CloudinaryOperations(_cloudinary);
                    //foreach (var img in imagesToRemove)
                    //{
                    //    var publicId = cloudinary.ExtractPublicIdFromUrl(img.ImageLink);
                    //    cloudinary.DeleteFileFromCloudinary(publicId);
                    //}

                    slideImageList = slideImageList.Where(x => !request.Ids.Contains(x.Id)).ToList();

                    // Reindex IDs
                    for (int i = 0; i < slideImageList.Count; i++)
                    {
                        slideImageList[i].Id = i + 1;
                    }

                    slideShow.SlideImage = JsonSerializer.Serialize(slideImageList);

                    slideShow.LogSlideShows ??= new List<LogSlideShow>();
                    slideShow.LogSlideShows.Add(new LogSlideShow
                    {
                        LogSlideShowId = 0,
                        Title = slideShow.Title,
                        Description = slideShow.Description,
                        CreateDate = DateTime.UtcNow,
                        UpdateDate = DateTime.UtcNow,
                        SlideImage = slideShow.SlideImage,
                        UserId = request.UserId,
                        Process = ProcessMethod.DELETE
                    });

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return new GetSlideImageListResponse { SlideImages = slideImageList };
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        //public async Task<GetSlideImageResponse> AddSlideImageAsync(AddSlideImageRequest addSlideImageRequest)
        //{
        //    using (var uow = await _unitOfWork.BeginTransactionAsync())
        //    {
        //        try
        //        {
        //            var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG };
        //            if (!FileOperations.CheckFileType(allowedContentTypes, addSlideImageRequest.SlideImage))
        //            {
        //                throw new ArgumentException(CommonExtensions.GetValidateMessage(
        //                    _localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}"));
        //            }

        //            // Save image to local temporary folder
        //            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
        //            var filePath = await FileOperations.SaveFileToLocal(folderPath, addSlideImageRequest.SlideImage);

        //            // Upload to Cloudinary
        //            var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
        //            var publicId = $"{nameof(SlideShow)}_{addSlideImageRequest.SlideShowId}_{Guid.NewGuid()}";

        //            var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(
        //                filePath, CommonCloudinaryAttribute.assetFolderSlideShowImage, publicId)
        //                ?? throw new InvalidOperationException(_localizer["UploadSlideImageCloudinaryFailed"]);

        //            var secureUrl = resultUpload["secure_url"]?.ToString()
        //                ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

        //            // Remove local temp file
        //            FileOperations.DeleteFileFromLocal(filePath, folderPath);

        //            // Get the SlideShow entity
        //            var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(addSlideImageRequest.SlideShowId!.Value)
        //                ?? throw new InvalidOperationException(_localizer["SlideShowNotFound"]);

        //            // Track the entity for update
        //            await uow.TrackEntity(slideShow);

        //            // Deserialize the SlideImage JSON field
        //            var slideImageList = string.IsNullOrWhiteSpace(slideShow.SlideImage)
        //                ? new List<GetSlideImageResponse>()
        //                : JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage!)!;

        //            var newId = slideImageList.Any() ? slideImageList.Max(x => x.Id) + 1 : 1;

        //            var newSlideImage = new GetSlideImageResponse
        //            {
        //                Id = newId,
        //                Capture = addSlideImageRequest.Capture,
        //                ImageLink = secureUrl
        //            };

        //            slideImageList.Add(newSlideImage);

        //            // Update SlideImage field in the tracked entity
        //            slideShow.SlideImage = JsonSerializer.Serialize(slideImageList);

        //            await uow.SaveChangesAsync();
        //            await uow.CommitTransactionAsync();

        //            return new GetSlideImageResponse
        //            {
        //                Id = newSlideImage.Id,
        //                Capture = newSlideImage.Capture,
        //                ImageLink = newSlideImage.ImageLink
        //            };
        //        }
        //        catch (Exception ex)
        //        {
        //            await uow.RollbackTransactionAsync();
        //            throw new InvalidOperationException(ex.Message);
        //        }
        //    }
        //}

        //public async Task<GetSlideImageResponse> UpdateSlideImageAsync(UpdateSlideImageRequest request)
        //{
        //    using (var uow = await _unitOfWork.BeginTransactionAsync())
        //    {
        //        try
        //        {
        //            var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(request.SlideShowId)
        //                              ?? throw new InvalidOperationException(_localizer["SlideShowNotFound"]);

        //            await uow.TrackEntity(slideShow);

        //            // Deserialize JSON from SlideShow.SlideImage
        //            var slideImageList = string.IsNullOrWhiteSpace(slideShow.SlideImage)
        //                ? new List<GetSlideImageResponse>()
        //                : JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage!)!;

        //            var targetImage = slideImageList.FirstOrDefault(x => x.Id == request.Id)
        //                              ?? throw new KeyNotFoundException(_localizer["SlideImageNotFound"]);

        //            // Upload new image if provided
        //            if (request.SlideImage != null)
        //            {
        //                var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG };
        //                if (!FileOperations.CheckFileType(allowedContentTypes, request.SlideImage))
        //                {
        //                    throw new ArgumentException(CommonExtensions.GetValidateMessage(
        //                        _localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}"));
        //                }

        //                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
        //                var filePath = await FileOperations.SaveFileToLocal(folderPath, request.SlideImage);

        //                var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
        //                var publicId = $"{nameof(SlideShow)}_{request.SlideShowId}_{Guid.NewGuid()}";

        //                var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(
        //                    filePath, CommonCloudinaryAttribute.assetFolderSlideShowImage, publicId)
        //                    ?? throw new InvalidOperationException(_localizer["UploadSlideImageCloudinaryFailed"]);

        //                var secureUrl = resultUpload["secure_url"]?.ToString()
        //                    ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

        //                // Remove old image from Cloudinary
        //                if (!string.IsNullOrEmpty(targetImage.ImageLink))
        //                {
        //                    var oldPublicId = cloudinaryOperations.ExtractPublicIdFromUrl(targetImage.ImageLink);
        //                    cloudinaryOperations.DeleteFileFromCloudinary(oldPublicId);
        //                }

        //                FileOperations.DeleteFileFromLocal(filePath, folderPath);

        //                // Update ImageLink
        //                targetImage.ImageLink = secureUrl;
        //            }

        //            // Update Capture if provided
        //            if (!string.IsNullOrWhiteSpace(request.Capture))
        //            {
        //                targetImage.Capture = request.Capture;
        //            }

        //            // Save updated list back to JSON string
        //            slideShow.SlideImage = JsonSerializer.Serialize(slideImageList);

        //            await uow.SaveChangesAsync();
        //            await uow.CommitTransactionAsync();

        //            return targetImage;
        //        }
        //        catch (Exception ex)
        //        {
        //            await uow.RollbackTransactionAsync();
        //            throw new InvalidOperationException(ex.Message);
        //        }
        //    }
        //}
        //public async Task<bool> DeleteSlideImageAsync(DeleteSlideImageRequest request)
        //{
        //    using (var uow = await _unitOfWork.BeginTransactionAsync())
        //    {
        //        try
        //        {
        //            // Get SlideShow entity
        //            var slideShow = await _slideShowRepository.GetSlideShowByIdAsync(request.SlideShowId)
        //                              ?? throw new InvalidOperationException(_localizer["SlideShowNotFound"]);

        //            // Track entity for update
        //            await uow.TrackEntity(slideShow);

        //            // Deserialize SlideImage JSON field
        //            var slideImageList = string.IsNullOrWhiteSpace(slideShow.SlideImage)
        //                ? new List<GetSlideImageResponse>()
        //                : JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage!)!;

        //            // Find matching images by ID
        //            var imagesToDelete = slideImageList.Where(x => request.Ids.Contains(x.Id)).ToList();
        //            if (!imagesToDelete.Any())
        //            {
        //                throw new KeyNotFoundException(_localizer["SlideImageNotFound"]);
        //            }

        //            var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

        //            // Delete images from Cloudinary
        //            foreach (var image in imagesToDelete)
        //            {
        //                if (!string.IsNullOrEmpty(image.ImageLink))
        //                {
        //                    var publicId = cloudinaryOperations.ExtractPublicIdFromUrl(image.ImageLink);
        //                    cloudinaryOperations.DeleteFileFromCloudinary(publicId);
        //                }
        //            }

        //            // Remove deleted images from list
        //            slideImageList = slideImageList.Where(x => !request.Ids.Contains(x.Id)).ToList();
        //            slideShow.SlideImage = JsonSerializer.Serialize(slideImageList);

        //            await uow.SaveChangesAsync();
        //            await uow.CommitTransactionAsync();

        //            return true;
        //        }
        //        catch (Exception ex)
        //        {
        //            await uow.RollbackTransactionAsync();
        //            throw new InvalidOperationException(ex.Message);
        //        }
        //    }
        //}
    }
}
