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
    public class SlideShowService : ISlideShowService
    {
        #region Fields
        private readonly ISlideShowRepository _slideShowRepository;
        private readonly ILogSlideShowRepository _logSlideShowRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public SlideShowService(
            Domain.Interfaces.ISlideShowRepository slideShowRepository,
            IUnitOfWork unitOfWork,
            ILogSlideShowRepository logSlideShowRepository,
            Cloudinary cloudinary,
            IConfiguration configuration,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {   _slideShowRepository = slideShowRepository;
            _unitOfWork = unitOfWork;
            _logSlideShowRepository = logSlideShowRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
            _localizer = localizer;
        }
        #endregion
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


        public async Task<GetSlideShowResponse> CreateSlideShowAsync(AddSlideShowRequest addSlideShowRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
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
                    throw new InvalidOperationException(_localizer["AddSlideShowFailed"]);
                }
            }
        }

        public async Task<GetSlideShowResponse> UpdateSlideShowAsync(Guid id, UpdateSlideShowRequest updateSlideShowRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
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
                        Process = "UPDATE",
                    });

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetSlideShowResponseMapper.GetSlideShowMapEntityToDTO(slideShowEntity);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["UpdateSlideShowFailed"]);
                }
            }
        }

        //public async Task<bool> DeleteSlideShowAsync(Guid id)
        //{
        //    using (var uow = await _unitOfWork.BeginTransactionAsync())
        //    {
        //        try
        //        {
        //            var slideShowEntity = await _slideShowRepository.GetSlideShowByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["SlideShow"]));

        //            var newLogSlideShow = new LogSlideShow
        //            {
        //                LogSlideShowId = 0,
        //                Title = slideShowEntity.Title,
        //                Image = slideShowEntity.Image,
        //                Description = slideShowEntity.Description,
        //                CreateDate = slideShowEntity.CreateDate,
        //                UserId = slideShowEntity.UserId,
        //                SlideShowId = slideShowEntity.SlideShowId,
        //                Process = "DELETE",
        //            };
        //            await _logSlideShowRepository.CreateLogSlideShowAsync(newLogSlideShow);

        //            //delete slideshow
        //            var slideShow = new SlideShow { SlideShowId = id };
        //            await uow.TrackEntity(slideShow);

        //            await _slideShowRepository.SoftDeleteSlideShowAsync(slideShow);

        //            await uow.SaveChangesAsync();
        //            await uow.CommitTransactionAsync();
        //            return true;
        //        }
        //        catch (Exception ex)
        //        {
        //            await uow.RollbackTransactionAsync();
        //            throw new InvalidOperationException(_localizer["DeleteSlideShowFailed"]);
        //        }
        //    }
        //}

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
                        Process = "DELETE",
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
                    throw new InvalidOperationException(_localizer["DeleteSlideShowFailed"]);
                }
            }
        }
    }
}
