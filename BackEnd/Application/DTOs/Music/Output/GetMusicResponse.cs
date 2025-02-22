namespace Application
{
    public class GetMusicResponse
    {
        public required Guid MusicId { get; set; }
        public string? MusicTitle { get; set; }
        public string? MusicAuthor { get; set; }
        public DateTime? MusicCreateDate { get; set; }
        public string? ImageLink { get; set; }
        public string? AudioLink { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string? UserName { get; set; }
        public string? RoleName { get; set; }
    }
}

