using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Blog.Input;
using Application.DTOs.Blog.Output;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IBlogService
    {
        Task<IEnumerable<GetBlogResponse>> GetAllBlogsAsync();
        Task<GetBlogResponse?> GetBlogByIdAsync(Guid id);
        Task<GetBlogResponse> CreateBlogAsync(AddBlogRequest addBlogRequest);
        Task<bool> DeleteBlogAsync(Guid id);
        Task<GetBlogResponse> UpdateBlogAsync(Guid id, UpdateBlogRequest updateBlogRequest);
    }
}
