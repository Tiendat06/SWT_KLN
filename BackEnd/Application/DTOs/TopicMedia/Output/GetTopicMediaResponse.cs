namespace Application
{
    public class GetTopicMediaResponse
    {
        public required Guid TopicMediaId { get; set; }
        public Guid? TopicId { get; set; }
        public string? Title { get; set; }
        public string? ImageLink { get; set; }
        public string? VideoLink { get; set; }
    }
}
