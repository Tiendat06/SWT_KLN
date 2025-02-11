using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;
using Application.DTOs.Blog.Input;
using Application.DTOs.Blog.Output;

namespace Application.Interfaces
{
    public interface IBlogService
    {
        //Task<IEnumerable<GetBlogResponse>> GetAllBlogsAsync();
        Task<GetBlogResponse?> GetBlogByIdAsync(Guid id);
        Task<IEnumerable<GetBlogResponse>> GetAllBlogsAsync(GetAllBlogRequest input);
        Task<GetBlogResponse> CreateBlogAsync(AddBlogRequest addBlogRequest);
        Task<bool> DeleteBlogAsync(Guid id);
        Task<GetBlogResponse> UpdateBlogAsync(Guid id, UpdateBlogRequest updateBlogRequest);
    }
}
