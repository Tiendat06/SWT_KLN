using Application.DTOs.TopicMedia.Output;

namespace Application.DTOs.Topic.Output
{
    public class GetTopicResponse
    {
        public required Guid TopicId { get; set; }
        public string? Capture { get; set; }
        public DateTime? CreateDate { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }
        public ICollection<GetTopicMediaResponse> TopicMedias { get; set; } = new List<GetTopicMediaResponse>();
    }
}
