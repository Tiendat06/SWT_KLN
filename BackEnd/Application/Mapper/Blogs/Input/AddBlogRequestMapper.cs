using Domain.Entities;

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
