using Domain.Entities;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;

namespace Application.Mapper.Topics.Output
{
    public class GetTopicResponseMapper
    {
        public static GetTopicResponse GetTopicMapEntityToDTO(Topic topic)
        {
            return new GetTopicResponse
            {
                TopicId = topic.TopicId,
                Capture = topic.Capture,
                MediaTypeId = topic.MediaTypeId,
                CreateDate = topic.CreateDate,
                UserId = topic.UserId,
                Name = topic.User.Name,
                Email = topic.User.Email,
                UserName = topic.User.Account.UserName,
                RoleName = topic.User.Account.Role.RoleName,
                Images = topic.Images != null ? JsonSerializer.Deserialize<List<GetTopicImagesResponse>>(topic.Images) : new List<GetTopicImagesResponse>(),
                Videos = topic.Videos != null ? JsonSerializer.Deserialize<List<GetTopicVideoLinkResponse>>(topic.Videos) : new List<GetTopicVideoLinkResponse>()
            };
        }
        public static IEnumerable<GetTopicResponse> GetTopicListMapEntityToDTO(IEnumerable<Topic> topics)
        {
            List<GetTopicResponse> topicListDTO = new();
            foreach (var topic in topics)
            {
                topicListDTO.Add(new GetTopicResponse
                {
                    TopicId = topic.TopicId,
                    Capture = topic.Capture,
                    MediaTypeId = topic.MediaTypeId,
                    CreateDate = topic.CreateDate,
                    UserId = topic.UserId,
                    Name = topic.User.Name,
                    Email = topic.User.Email,
                    UserName = topic.User.Account.UserName,
                    RoleName = topic.User.Account.Role.RoleName,
                    Images = topic.Images != null ? JsonSerializer.Deserialize<List<GetTopicImagesResponse>>(topic.Images) : new List<GetTopicImagesResponse>(),
                    Videos = topic.Videos != null ? JsonSerializer.Deserialize<List<GetTopicVideoLinkResponse>>(topic.Videos) : new List<GetTopicVideoLinkResponse>()
                });
            }
            return topicListDTO;
        }
    }
}
