using Application.Extension;
using Application.Interfaces;
using Application.Mapper.Books.Input;
using Application.Mapper.Books.Output;
using KLN.Shared.CrossCuttingConcerns.Utils;
using CloudinaryDotNet;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Localization;
using Microsoft.Extensions.Localization;
using KLN.Shared.CrossCuttingConcerns;

namespace Application.Services
{
    public class BookService(
            IBookRepository _bookRepository,
            ILogBookRepository _logBookRepository,
            Cloudinary _cloudinary,
            IUnitOfWork _unitOfWork,
            IStringLocalizer<KLNSharedResources> _localizer
        ) : IBookService
    {
        public async Task<PaginationResponseDto<GetBookResponse>> GetAllBooksAsync(GetAllBookRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var type = input.Type;
            var books = await _bookRepository.GetAllBooksAsync(page, fetch, type);
            var totalBooks = await _bookRepository.CountBooksAsync(type);
            var bookMapper = GetBookResponseMapper.GetBookListMapEntityToDTO(books);
            return new PaginationResponseDto<GetBookResponse>(totalBooks, bookMapper);
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

                    // Check for duplicate title (ignore current book's title)
                    var existingBook = await _bookRepository.GetBookByTitleAsync(updateBookRequest.Title);
                    if (existingBook != null && existingBook.BookId != id)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["BookTitle"]));
                    }

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

                        var resultUpload = cloudinaryOperations.UploadRawFileToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException(_localizer["UploadPDFCloudinaryFailed"]);
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
                        Process = ProcessMethod.UPDATE,
                    };
                    await _logBookRepository.CreateLogBookAsync(newLogBook);
                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();

                    return GetBookResponseMapper.GetBookMapEntityToDTO(bookEntity);

                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<GetBookResponse> CreateBookAsync(AddBookRequest addBookRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Check for duplicate title
                    var existingBook = await _bookRepository.GetBookByTitleAsync(addBookRequest.Title);
                    if (existingBook != null)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["BookTitle"]));
                    }

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
                    var resultPDF = cloudinaryOperations.UploadRawFileToCloudinary(filePathPDF, assetFolderPDF, publicId) ?? throw new InvalidOperationException(_localizer["UploadPDFCloudinaryFailed"]);
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
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<bool> DeleteMultipleBooksAsync(List<Guid> ids)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Fetch all music entities once for logging
                    //Console.WriteLine($"ids: {ids}");
                    var bookEntities = await _bookRepository.GetBookByIdsAsync(ids) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Book"]));
                    //Console.WriteLine($"Fetched {bookEntities?.Count() ?? 0} book records for deletion.");
                    if (bookEntities == null || !bookEntities.Any())
                    {
                        throw new KeyNotFoundException(_localizer["NoBookRecordsFound"]);
                    }
                    // update log book
                    var logEntries = bookEntities.Select(book => new LogBook
                    {
                        LogBookId = 0,
                        Title = book.Title,
                        Image = book.Image,
                        CreateDate = book.CreateDate,
                        UserId = book.UserId,
                        Description = book.Description,
                        BookContent = book.BookContent,
                        Publisher = book.Publisher,
                        Author = book.Author,
                        YearPublic = book.YearPublic,
                        BookId = book.BookId,
                        Process = ProcessMethod.DELETE,
                    }).ToList();

                    await _logBookRepository.CreateLogBookRangeAsync(logEntries);

                    await _bookRepository.SoftDeleteMultipleBookAsync(ids);

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
