namespace Application.DTOs.Video.Output
{
    public class GetVideoResponse
    {
        public required Guid? VideoId { get; set; }
        public string? VideoTitle { get; set; }
        public DateTime? VideoCreateDate { get; set; }
        public string? VideoImageLink { get; set; }
        public string? VideoLink { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }
    }
}
