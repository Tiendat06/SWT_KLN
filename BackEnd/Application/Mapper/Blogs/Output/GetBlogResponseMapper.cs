using Domain.Entities;

namespace Application.Mapper.Blogs.Output
{
    public class GetBlogResponseMapper
    {
        public static GetBlogResponse GetBlogMapEntityToDTO(Blog blog)
        {
            return new GetBlogResponse
            {
                BlogId = blog.BlogId,
                BlogTitle = blog.BlogTitle,
                BlogContent = blog.BlogContent,
                BlogImage = blog.BlogImage,
                CreateDate = blog.CreateDate,
                UserId = blog.UserId,
                Name = blog.User.Name,
                Email = blog.User.Email,
                UserName = blog.User.Account.UserName,
                RoleName = blog.User.Account.Role.RoleName
            };
        }

        public static IEnumerable<GetBlogResponse> GetBlogListMapEntityToDTO(IEnumerable<Blog> blogs)
        {
            List<GetBlogResponse> blogListDTO = [];
            foreach (var blog in blogs)
            {
                blogListDTO.Add(new GetBlogResponse
                {
                    BlogId = blog.BlogId,
                    BlogTitle = blog.BlogTitle,
                    BlogContent = blog.BlogContent,
                    BlogImage = blog.BlogImage,
                    CreateDate = blog.CreateDate,
                    UserId = blog.UserId,
                    Name = blog.User.Name,
                    Email = blog.User.Email,
                    UserName = blog.User.Account.UserName,
                    RoleName = blog.User.Account.Role.RoleName
                });
            }
            return blogListDTO;
        }
    }
}
