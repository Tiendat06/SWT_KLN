using Application.Extension;
using Application.Interfaces;
using Application.Mapper.Magazines.Input;
using Application.Mapper.Magazines.Output;
using Application.Utils;
using CloudinaryDotNet;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Localization;
using Microsoft.Extensions.Localization;

namespace Application.Services
{
    public class MagazineService : IMagazineService
    {
        #region Fields
        private readonly IMagazineRepository _magazineRepository;
        private readonly ILogMagazineRepository _logMagazineRepository;
        private readonly Cloudinary _cloudinary;
        private readonly IUnitOfWork _unitOfWork;
        IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public MagazineService(
            IMagazineRepository magazineRepository,
            IUnitOfWork unitOfWork,
            ILogMagazineRepository logMagazineRepository,
            Cloudinary cloudinary,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _magazineRepository = magazineRepository;
            _unitOfWork = unitOfWork;
            _logMagazineRepository = logMagazineRepository;
            _cloudinary = cloudinary;
            _localizer = localizer;
        }
        #endregion

        public async Task<IEnumerable<GetMagazineResponse>> GetAllMagazinesAsync(GetAllMagazineRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var magazines = await _magazineRepository.GetAllMagazinesAsync(page, fetch);
            return GetMagazineResponseMapper.GetMagazineListMapEntityToDTO(magazines);
        }

        public async Task<GetMagazineResponse> GetMagazineByIdAsync(Guid id)
        {
            var magazine = await _magazineRepository.GetMagazineByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Magazine"]));
            return GetMagazineResponseMapper.GetMagazineMapEntityToDTO(magazine);
        }

        public async Task<GetMagazineResponse> UpdateMagazineAsync(Guid id, UpdateMagazineRequest updateMagazineRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var magazineEntity = await _magazineRepository.GetMagazineByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Magazine"]));
                    await uow.TrackEntity(magazineEntity);

                    // update Magazine
                    magazineEntity.Title = updateMagazineRequest.Title;
                    magazineEntity.MagazineContent = updateMagazineRequest.MagazineContent;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    // upload new image to cloudinary
                    if (updateMagazineRequest.Image != null)
                    {
                        // check file type
                        var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, };
                        var isAllowed = FileOperations.CheckFileType(allowedContentTypes, updateMagazineRequest.Image) == false
                            ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                        // add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, updateMagazineRequest.Image);

                        // upload to cloudinary
                        var assetFolder = CommonCloudinaryAttribute.assetFolderMagazineImage;
                        var publicId = $"{nameof(Magazine)}_{id}";

                        var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var secure_url = resultUpload["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // delete file and folder from local
                        var isDeleted = FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        magazineEntity.Image = secure_url;
                    }
                    
                    // update log Magazine
                    var newLogMagazine = new LogMagazine
                    {
                        LogMagazineId = 0,
                        Title = magazineEntity.Title,
                        Image = magazineEntity.Image,
                        CreateDate = magazineEntity.CreateDate,
                        UserId = magazineEntity.UserId,
                        MagazineContent = magazineEntity.MagazineContent,
                        MagazineId = magazineEntity.MagazineId,
                        Process = "UPDATE",
                    };
                    await _logMagazineRepository.CreateLogMagazineAsync(newLogMagazine);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetMagazineResponseMapper.GetMagazineMapEntityToDTO(magazineEntity);

                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["UpdateMagazineFailed"]);
                }
            }
        }

        public async Task<GetMagazineResponse> CreateMagazineAsync(AddMagazineRequest addMagazineRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    Guid newGuid = Guid.NewGuid();
                    var assetFolderImage = CommonCloudinaryAttribute.assetFolderMagazineImage;
                    var publicId = $"{nameof(Magazine)}_{newGuid}";
                    var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG };

                    // upload Image
                    // check file type
                    var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, addMagazineRequest.Image) == false ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                    // add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePathImage = await FileOperations.SaveFileToLocal(folderPath, addMagazineRequest.Image);

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                    var magazineImage = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                    // delete file and folder from local
                    var isDeletedImage = FileOperations.DeleteFileFromLocal(filePathImage, folderPath);

                    // map from DTO to entity
                    var addMagazineMapperDTOToEntity = AddMagazineRequestMapper.AddMagazineMapDTOToEntity(addMagazineRequest, magazineImage, newGuid);
                    await uow.TrackEntity(addMagazineMapperDTOToEntity);
                    await _magazineRepository.CreateMagazineAsync(addMagazineMapperDTOToEntity);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    var addedMagazine = await _magazineRepository.GetMagazineByIdAsync(newGuid) ?? throw new InvalidOperationException(_localizer["AddMagazineFailed"]);
                    return GetMagazineResponseMapper.GetMagazineMapEntityToDTO(addedMagazine);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["AddMagazineFailed"]);
                }
            }
        }

        public async Task<bool> DeleteMagazineAsync(Guid id)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var magazineEntity = await _magazineRepository.GetMagazineByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Magazine"]));
                    // update log Magazine
                    var newLogMagazine = new LogMagazine
                    {
                        LogMagazineId = 0,
                        Title = magazineEntity.Title,
                        Image = magazineEntity.Image,
                        CreateDate = magazineEntity.CreateDate,
                        UserId = magazineEntity.UserId,
                        MagazineContent = magazineEntity.MagazineContent,
                        MagazineId = magazineEntity.MagazineId,
                        Process = "DELETE",
                    };
                    await _logMagazineRepository.CreateLogMagazineAsync(newLogMagazine);

                    // delete image from cloudinary
                    //var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    //var publicId = $"{nameof(Magazine)}_{id}";
                    //var result = cloudinaryOperations.DeleteFileFromCloudinary(publicId);

                    // delete Magazine
                    var magazine = new Magazine { MagazineId = id };
                    await uow.TrackEntity(magazine);

                    await _magazineRepository.SoftDeleteMagazineAsync(magazine);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    return true;
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["DeleteMagazineFailed"]);
                }
            }
        }
    }
}
