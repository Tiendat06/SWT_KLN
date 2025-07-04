using Domain.Entities;
using System.Text.Json;

namespace Application.Mapper.Topics.Input
{
    public class AddTopicRequestMapper
    {
        public static Topic AddTopicMapDTOToEntity(AddTopicRequest addTopicRequest, List<(string ImageUrl, string Capture)> images, List<(string VideoUrl, string Capture)> videos, Guid newGuid)
        {
            return new Topic
            {
                TopicId = newGuid,
                Capture = addTopicRequest.Capture,
                Description = addTopicRequest.Description,
                Images = JsonSerializer.Serialize(images.Select((img, index) => new GetTopicImageResponse
                {
                    Id = index + 1,
                    Capture = img.Capture,
                    ImageLink = img.ImageUrl
                })),
                Videos = JsonSerializer.Serialize(videos.Select((vid, index) => new GetTopicVideoResponse
                {
                    Id = index + 1,
                    Capture = vid.Capture,
                    VideoLink = vid.VideoUrl
                })),
                MediaTypeId = addTopicRequest.MediaTypeId,
                UserId = addTopicRequest.UserId
            };
        }
    }
}
