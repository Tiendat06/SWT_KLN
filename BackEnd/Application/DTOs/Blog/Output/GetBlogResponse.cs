using FluentValidation;

namespace Application
{
    public class GetBlogResponse
    {
        public required Guid BlogId { get; set; }
        public string? BlogTitle { get; set; }
        public string? BlogContent { get; set; }
        public string? BlogImage { get; set; }
        public DateTime? CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }

    }

    public class GetBlogResponseValidator : AbstractValidator<GetBlogResponse>
    {
        public GetBlogResponseValidator()
        {
            
        }
    }
}
