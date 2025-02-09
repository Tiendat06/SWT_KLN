using Application.DTOs.Blog.Input;
using Application.DTOs.Blog.Output;
using Application.Interfaces;
using Application.Mapper.Blogs.Input;
using Application.Mapper.Blogs.Output;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Utils;
using System.Text.Json;
using Application.Extension;

namespace Application.Services
{
    public class BlogService : IBlogService
    {
        #region Fields
        private readonly IBlogRepository _blogRepository;
        private readonly ILogBlogRepository _logBlogRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        private readonly IConfiguration _configuration;
        #endregion

        #region Constructor
        public BlogService(
            IBlogRepository blogRepository,
            IUnitOfWork unitOfWork, 
            ILogBlogRepository logBlogRepository,
            Cloudinary cloudinary,
            IConfiguration configuration
        )
        {
            _blogRepository = blogRepository;
            _unitOfWork = unitOfWork;
            _logBlogRepository = logBlogRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
        }
        #endregion

        public async Task<IEnumerable<GetBlogResponse>> GetAllBlogsAsync()
        {
            var blogs = await _blogRepository.GetAllBlogsAsync();
            Console.WriteLine(JsonSerializer.Serialize(blogs));

            return GetBlogResponseMapper.GetBlogListMapEntityToDTO(blogs);
        }

        public async Task<GetBlogResponse?> GetBlogByIdAsync(Guid id)
        {
            var blog = await _blogRepository.GetBlogByIdAsync(id) ?? throw new KeyNotFoundException("Bài viết không tồn tại !");

            return GetBlogResponseMapper.GetBlogMapEntityToDTO(blog);
        }

        public async Task<GetBlogResponse> CreateBlogAsync(AddBlogRequest addBlogRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var assetFolder = CommonCloudinaryAttribute.assetFolderBlog;
                    Guid newGuid = Guid.NewGuid();
                    var publicId = $"{nameof(Blog)}_{newGuid}";
                    var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, };

                    // check file type
                    var isAllowed = FileOperations.CheckFileType(allowedContentTypes, addBlogRequest.BlogImageFile) == false ? throw new ArgumentException("Vui lòng chọn các định dạng hợp lệ (jpeg, png)") : true;

                    // add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePath = await FileOperations.SaveFileToLocal(folderPath, addBlogRequest.BlogImageFile);

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var result = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException("Tải ảnh lên Cloudinary không thành công !");
                    var secure_url = result["secure_url"]?.ToString() ?? throw new KeyNotFoundException("Trường dữ liệu secure_url không tồn tại !");

                    // delete file and folder from local
                    var isDeleted = FileOperations.DeleteFileFromLocal(filePath, folderPath);

                    // add blog
                    var addBlogMapperDTOToEntity = AddBlogRequestMapper.AddBlogMapDTOToEntity(addBlogRequest, secure_url, newGuid);
                    await uow.TrackEntity(addBlogMapperDTOToEntity);

                    await _blogRepository.CreateBlogAsync(addBlogMapperDTOToEntity);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    var addedBlog = await _blogRepository.GetBlogByIdAsync(addBlogMapperDTOToEntity.BlogId) ?? throw new InvalidOperationException("Thêm bài viết không thành công !");
                    return GetBlogResponseMapper.GetBlogMapEntityToDTO(addedBlog);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException("Thêm bài viết không thành công !");
                }

            }
        }

        public async Task<bool> DeleteBlogAsync(Guid id)
        {
            using(var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var blogEntity = await _blogRepository.GetBlogByIdAsync(id) ?? throw new KeyNotFoundException("Bài viết không tồn tại !");
                    // update log blog
                    var newLogBlog = new LogBlog
                    {
                        LogBlogId = 0,
                        BlogImage = blogEntity.BlogImage,
                        BlogTitle = blogEntity.BlogTitle,
                        BlogContent = blogEntity.BlogContent,
                        CreateDate = blogEntity.CreateDate,
                        UserId = blogEntity.UserId,
                        BlogId = blogEntity.BlogId,
                        Process = "DELETE",
                    };
                    await _logBlogRepository.CreateLogBlogAsync(newLogBlog);

                    // delete image from cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var publicId = $"{nameof(Blog)}_{id}";
                    var result = cloudinaryOperations.DeleteFileFromCloudinary(publicId);

                    // delete blog
                    var blog = new Blog { BlogId = id };
                    await uow.TrackEntity(blog);

                    await _blogRepository.SoftDeleteBlogAsync(blog);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    return true;
                } catch(Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException("Xóa bài viết không thành công !");
                }
            }
        }

        public async Task<GetBlogResponse> UpdateBlogAsync(Guid id, UpdateBlogRequest updateBlogRequest)
        {
            using(var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // update blog
                    var blogEntity = await _blogRepository.GetBlogByIdAsync(id) ?? throw new KeyNotFoundException("Cập nhật bài viết không thành công !");
                    await uow.TrackEntity(blogEntity);

                    blogEntity.BlogTitle = updateBlogRequest.BlogTitle;
                    blogEntity.BlogContent = updateBlogRequest.BlogContent;
                    //blogEntity.BlogImage = updateBlogRequest.BlogImage;
                    if(updateBlogRequest.BlogImageFile != null)
                    {
                        var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                        // upload new image to cloudinary
                        // check file type
                        var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, };
                        var isAllowed = FileOperations.CheckFileType(allowedContentTypes, updateBlogRequest.BlogImageFile) == false ? throw new ArgumentException("Vui lòng chọn các định dạng hợp lệ (jpeg, png)") : true;

                        // add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, updateBlogRequest.BlogImageFile);

                        // upload to cloudinary
                        var assetFolder = CommonCloudinaryAttribute.assetFolderBlog;
                        var publicId = $"{nameof(Blog)}_{id}";

                        var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException("Tải ảnh lên Cloudinary không thành công !");
                        var secure_url = resultUpload["secure_url"]?.ToString() ?? throw new KeyNotFoundException("Trường dữ liệu secure_url không tồn tại !");

                        // delete file and folder from local
                        var isDeleted = FileOperations.DeleteFileFromLocal(filePath, folderPath);

                        blogEntity.BlogImage = secure_url;
                    }

                    // update log blog
                    var newLogBlog = new LogBlog
                    {
                        LogBlogId = 0,
                        BlogImage = blogEntity.BlogImage,
                        BlogTitle = blogEntity.BlogTitle,
                        BlogContent = blogEntity.BlogContent,
                        CreateDate = blogEntity.CreateDate,
                        UserId = blogEntity.UserId,
                        BlogId = blogEntity.BlogId,
                        Process = "UPDATE",
                    };
                    await _logBlogRepository.CreateLogBlogAsync(newLogBlog);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    var blogMapperDTO = GetBlogResponseMapper.GetBlogMapEntityToDTO(blogEntity);
                    return blogMapperDTO;
                } catch(Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException("Cập nhật bài viết không thành công !");
                }
            }
        }
    }
}
