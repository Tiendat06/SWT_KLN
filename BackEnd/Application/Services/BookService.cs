using Application.DTOs;
using Application.DTOs.Book.Input;
using Application.DTOs.Book.Output;
using Application.Extension;
using Application.Interfaces;
using Application.Mapper.Books.Input;
using Application.Mapper.Books.Output;
using Application.Utils;
using CloudinaryDotNet;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Localization;
using Microsoft.Extensions.Localization;

namespace Application.Services
{
    public class BookService : IBookService
    {
        #region Fields
        private readonly IBookRepository _bookRepository;
        private readonly ILogBookRepository _logBookRepository;
        private readonly Cloudinary _cloudinary;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public BookService(
            IBookRepository bookRepository,
            IUnitOfWork unitOfWork,
            ILogBookRepository logBookRepository,
            Cloudinary cloudinary,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _bookRepository = bookRepository;
            _unitOfWork = unitOfWork;
            _logBookRepository = logBookRepository;
            _cloudinary = cloudinary;
            _localizer = localizer;
        }
        #endregion

        public async Task<IEnumerable<GetBookResponse>> GetAllBooksAsync(GetAllBookRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var books = await _bookRepository.GetAllBooksAsync(page, fetch);
            return GetBookResponseMapper.GetBookListMapEntityToDTO(books);
        }

        public async Task<GetBookResponse> GetBookByIdAsync(Guid id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Book"]));
            return GetBookResponseMapper.GetBookMapEntityToDTO(book);
        }

        public async Task<GetBookResponse> UpdateBookAsync(Guid id, UpdateBookRequest updateBookRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync()) 
            {
                try
                {
                    var bookEntity = await _bookRepository.GetBookByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Book"]));
                    await uow.TrackEntity(bookEntity);

                    // update book
                    bookEntity.Title = updateBookRequest.Title;
                    //bookEntity.Image = updateBookRequest.Image;
                    //bookEntity.BookContent = updateBookRequest.BookContent;
                    bookEntity.Publisher = updateBookRequest.Publisher;
                    bookEntity.Author = updateBookRequest.Author;
                    bookEntity.YearPublic = updateBookRequest.YearPublic;
                    bookEntity.UserId = updateBookRequest.UserId;
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);

                    // upload new image to cloudinary
                    if (updateBookRequest.Image != null)
                    {
                        // check file type
                        var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, };
                        var isAllowed = FileOperations.CheckFileType(allowedContentTypes, updateBookRequest.Image) == false 
                            ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                        // add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, updateBookRequest.Image);

                        // upload to cloudinary
                        var assetFolder = CommonCloudinaryAttribute.assetFolderBookImage;
                        var publicId = $"{nameof(Book)}_{id}";

                        var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var secure_url = resultUpload["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // delete file and folder from local
                        var isDeleted = FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        bookEntity.Image = secure_url;
                    }

                    // upload new pdf to cloudinary
                    if (updateBookRequest.BookContent != null)
                    {
                        // check file type
                        var allowedContentTypes = new[] { CommonFileType.PDF, };
                        var isAllowed = FileOperations.CheckFileType(allowedContentTypes, updateBookRequest.BookContent) == false 
                            ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.PDF}")) : true;

                        // add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, updateBookRequest.BookContent);

                        // upload to cloudinary
                        var assetFolder = CommonCloudinaryAttribute.assetFolderBookPDF;
                        var publicId = $"{nameof(Book)}_{id}";

                        var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException(_localizer["UploadPDFCloudinaryFailed"]);
                        var secure_url = resultUpload["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                        // delete file and folder from local
                        var isDeleted = FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        bookEntity.BookContent = secure_url;
                    }

                    // update log book
                    var newLogBook = new LogBook
                    {
                        LogBookId = 0,
                        Title = bookEntity.Title,
                        Image = bookEntity.Image,
                        CreateDate = bookEntity.CreateDate,
                        UserId = bookEntity.UserId,
                        BookContent = bookEntity.BookContent,
                        Publisher = bookEntity.Publisher,
                        Author = bookEntity.Author,
                        YearPublic = bookEntity.YearPublic,
                        BookId = bookEntity.BookId,
                        Process = "UPDATE",
                    };
                    await _logBookRepository.CreateLogBookAsync(newLogBook);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetBookResponseMapper.GetBookMapEntityToDTO(bookEntity);
                    
                } catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["UpdateBookFailed"]);
                }
            }
        }

        public async Task<GetBookResponse> CreateBookAsync(AddBookRequest addBookRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    Guid newGuid = Guid.NewGuid();
                    var assetFolderPDF = CommonCloudinaryAttribute.assetFolderBookPDF;
                    var assetFolderImage = CommonCloudinaryAttribute.assetFolderBookImage;
                    var publicId = $"{nameof(Book)}_{newGuid}";
                    var allowedContentTypesPDF = new[] { CommonFileType.PDF, };
                    var allowedContentTypesImage = new[] { CommonFileType.JPEG, CommonFileType.PNG };

                    // upload PDF and Image
                    // check file type
                    var isAllowedPDF = FileOperations.CheckFileType(allowedContentTypesPDF, addBookRequest.BookContent) == false ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.PDF}")) : true;
                    var isAllowedImage = FileOperations.CheckFileType(allowedContentTypesImage, addBookRequest.Image) == false ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                    // add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePathPDF = await FileOperations.SaveFileToLocal(folderPath, addBookRequest.BookContent);
                    var filePathImage = await FileOperations.SaveFileToLocal(folderPath, addBookRequest.Image);

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var resultPDF = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathPDF, assetFolderPDF, publicId) ?? throw new InvalidOperationException(_localizer["UploadPDFCloudinaryFailed"]);
                    var bookContent = resultPDF["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));
                    
                    var resultImage = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePathImage, assetFolderImage, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                    var bookImage = resultImage["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                    // delete file and folder from local
                    var isDeletedPDF = FileOperations.DeleteFileFromLocal(filePathPDF, folderPath);
                    var isDeletedImage = FileOperations.DeleteFileFromLocal(filePathImage, folderPath);

                    // map from DTO to entity
                    var addBookMapperDTOToEntity = AddBookRequestMapper.AddBookMapDTOToEntity(addBookRequest, bookContent, bookImage, newGuid);
                    await uow.TrackEntity(addBookMapperDTOToEntity);
                    await _bookRepository.CreateBookAsync(addBookMapperDTOToEntity);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    var addedBook = await _bookRepository.GetBookByIdAsync(newGuid) ?? throw new InvalidOperationException(_localizer["AddBookFailed"]);
                    return GetBookResponseMapper.GetBookMapEntityToDTO(addedBook);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["AddBookFailed"]);
                }
            }
        }

        public async Task<bool> DeleteBookAsync(Guid id)
        {
            using(var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var bookEntity = await _bookRepository.GetBookByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Book"]));
                    // update log book
                    var newLogBook = new LogBook
                    {
                        LogBookId = 0,
                        Title = bookEntity.Title,
                        Image = bookEntity.Image,
                        CreateDate = bookEntity.CreateDate,
                        UserId = bookEntity.UserId,
                        BookContent = bookEntity.BookContent,
                        Publisher = bookEntity.Publisher,
                        Author = bookEntity.Author,
                        YearPublic = bookEntity.YearPublic,
                        BookId = bookEntity.BookId,
                        Process = "DELETE",
                    };
                    await _logBookRepository.CreateLogBookAsync(newLogBook);

                    // delete image from cloudinary
                    //var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    //var publicId = $"{nameof(Book)}_{id}";
                    //var result = cloudinaryOperations.DeleteFileFromCloudinary(publicId);

                    // delete book
                    var book = new Book { BookId = id };
                    await uow.TrackEntity(book);

                    await _bookRepository.SoftDeleteBookAsync(book);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    return true;
                } catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(_localizer["DeleteBookFailed"]);
                }
            }
        }
    }
}
