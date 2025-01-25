using Application.DTOs.Blog.Input;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mapper.Blogs.Input
{
    public class AddBlogRequestMapper
    {
        public static Blog AddBlogMapDTOToEntity(AddBlogRequest addBlogRequest, string blogImage, Guid guid)
        {
            return new Blog
            {
                BlogId = guid,
                BlogTitle = addBlogRequest.BlogTitle,
                BlogContent = addBlogRequest.BlogContent,
                BlogImage = blogImage,
                UserId = addBlogRequest.UserId,
            };
        }
    }
}
