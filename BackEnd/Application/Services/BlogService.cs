﻿using Application.Interfaces;
using Application.Mapper.Blogs.Input;
using Application.Mapper.Blogs.Output;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using KLN.Shared.CrossCuttingConcerns.Utils;
using KLN.Shared.CrossCuttingConcerns;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;

namespace Application.Services
{
    public class BlogService (
        IBlogRepository _blogRepository,
        ILogBlogRepository _logBlogRepository,
        IUnitOfWork _unitOfWork,
        Cloudinary _cloudinary,
        IStringLocalizer<KLNSharedResources> _localizer
        ) : IBlogService
    {
        public async Task<GetBlogResponse?> GetBlogByIdAsync(Guid id)
        {
            var blog = await _blogRepository.GetBlogByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Blog"]));

            return GetBlogResponseMapper.GetBlogMapEntityToDTO(blog);
        }

        public async Task<PaginationResponseDto<GetBlogResponse>> GetAllBlogsAsync(GetAllBlogRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var type = input.Type;
            var blogs = await _blogRepository.GetAllBlogsAsync(page, fetch, type);
            var totalBlogs = await _blogRepository.CountAllBlogsAsync(type);
            var blogMapper = GetBlogResponseMapper.GetBlogListMapEntityToDTO(blogs);
            return new PaginationResponseDto<GetBlogResponse>(totalBlogs, blogMapper);
        }

        public async Task<GetBlogResponse> CreateBlogAsync(AddBlogRequest addBlogRequest)
        {
            using (var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    // Check for duplicate title
                    var existingBlog = await _blogRepository.GetBlogByTitleAsync(addBlogRequest.BlogTitle);
                    if (existingBlog != null)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["BlogTitle"]));
                    }

                    var assetFolder = CommonCloudinaryAttribute.assetFolderBlog;
                    Guid newGuid = Guid.NewGuid();
                    var publicId = $"{nameof(Blog)}_{newGuid}";
                    var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, };

                    // check file type
                    var isAllowed = FileOperations.CheckFileType(allowedContentTypes, addBlogRequest.BlogImageFile) == false ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                    // add file to local
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                    var filePath = await FileOperations.SaveFileToLocal(folderPath, addBlogRequest.BlogImageFile);

                    // upload to cloudinary
                    var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    var result = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                    var secure_url = result["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

                    // delete file and folder from local
                    var isDeleted = FileOperations.DeleteFileFromLocal(filePath, folderPath);

                    // add blog
                    var addBlogMapperDTOToEntity = AddBlogRequestMapper.AddBlogMapDTOToEntity(addBlogRequest, secure_url, newGuid);
                    await uow.TrackEntity(addBlogMapperDTOToEntity);

                    await _blogRepository.CreateBlogAsync(addBlogMapperDTOToEntity);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    var addedBlog = await _blogRepository.GetBlogByIdAsync(addBlogMapperDTOToEntity.BlogId) ?? throw new InvalidOperationException(_localizer["AddBlogFailed"]);
                    return GetBlogResponseMapper.GetBlogMapEntityToDTO(addedBlog);
                }
                catch (Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }

            }
        }

        public async Task<bool> DeleteBlogAsync(Guid id)
        {
            using(var uow = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    var blogEntity = await _blogRepository.GetBlogByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Blog"]));
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
                        Process = ProcessMethod.DELETE,
                    };
                    await _logBlogRepository.CreateLogBlogAsync(newLogBlog);

                    // delete image from cloudinary
                    //var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                    //var publicId = $"{nameof(Blog)}_{id}";
                    //var result = cloudinaryOperations.DeleteFileFromCloudinary(publicId);

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
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }

        public async Task<bool> DeleteMultipleBlogsAsync(List<Guid> ids)
        {
            using (var uow = _unitOfWork.BeginTransactionAsync().Result)
            {
                try
                {
                    //Console.WriteLine($"ids: {ids}");
                    var blogEntities = await _blogRepository.GetBlogByIdsAsync(ids) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Blog"]));
                    //Console.WriteLine($"Fetched {blogEntities?.Count() ?? 0} book records for deletion.");
                    if (blogEntities == null || !blogEntities.Any())
                    {
                        throw new KeyNotFoundException(_localizer["NoBlogRecordsFound"]);
                    }
                    // update log blog
                    var logEntries = blogEntities.Select(blog => new LogBlog
                    {
                        LogBlogId = 0,
                        BlogImage = blog.BlogImage,
                        BlogTitle = blog.BlogTitle,
                        BlogContent = blog.BlogContent,
                        CreateDate = blog.CreateDate,
                        UserId = blog.UserId,
                        BlogId = blog.BlogId,
                        Process = ProcessMethod.DELETE,
                    }).ToList();

                    await _logBlogRepository.CreateLogBlogRangeAsync(logEntries);

                    // delete blog
                    _blogRepository.SoftDeleteMultipleBlogsByIdsAsync(ids);

                    uow.SaveChangesAsync();
                    uow.CommitTransactionAsync();
                    return true;
                }
                catch (Exception ex)
                {
                    uow.RollbackTransactionAsync().Wait();
                    throw new InvalidOperationException(ex.Message);
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
                    var blogEntity = await _blogRepository.GetBlogByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Blog"]));
                    await uow.TrackEntity(blogEntity);

                    // Check for duplicate title (ignore current blog's title)
                    var existingBlog = await _blogRepository.GetBlogByTitleAsync(updateBlogRequest.BlogTitle);
                    if (existingBlog != null && existingBlog.BlogId != id)
                    {
                        throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["AlreadyExists"], _localizer["BlogTitle"]));
                    }

                    blogEntity.BlogTitle = updateBlogRequest.BlogTitle;
                    blogEntity.BlogContent = updateBlogRequest.BlogContent;
                    blogEntity.UserId = updateBlogRequest.UserId;
                    //blogEntity.BlogImage = updateBlogRequest.BlogImage;
                    if(updateBlogRequest.BlogImageFile != null)
                    {
                        var cloudinaryOperations = new CloudinaryOperations(_cloudinary);
                        // upload new image to cloudinary
                        // check file type
                        var allowedContentTypes = new[] { CommonFileType.JPEG, CommonFileType.PNG, };
                        var isAllowed = FileOperations.CheckFileType(allowedContentTypes, updateBlogRequest.BlogImageFile) == false ? throw new ArgumentException(CommonExtensions.GetValidateMessage(_localizer["InvalidFileType"], $"{CommonFileType.JPEG}, {CommonFileType.PNG}")) : true;

                        // add file to local
                        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");
                        var filePath = await FileOperations.SaveFileToLocal(folderPath, updateBlogRequest.BlogImageFile);

                        // upload to cloudinary
                        var assetFolder = CommonCloudinaryAttribute.assetFolderBlog;
                        var publicId = $"{nameof(Blog)}_{id}";

                        var resultUpload = cloudinaryOperations.UploadFileFromLocalToCloudinary(filePath, assetFolder, publicId) ?? throw new InvalidOperationException(_localizer["UploadImageCloudinaryFailed"]);
                        var secure_url = resultUpload["secure_url"]?.ToString() ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], "secure_url"));

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
                        Process = ProcessMethod.UPDATE,
                    };
                    await _logBlogRepository.CreateLogBlogAsync(newLogBlog);

                    await uow.SaveChangesAsync();
                    await uow.CommitTransactionAsync();
                    var blogMapperDTO = GetBlogResponseMapper.GetBlogMapEntityToDTO(blogEntity);
                    return blogMapperDTO;
                } catch(Exception ex)
                {
                    await uow.RollbackTransactionAsync();
                    throw new InvalidOperationException(ex.Message);
                }
            }
        }
    }
}
