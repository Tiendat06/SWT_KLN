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
                CreateDate = topic.CreateDate,
                UserId = topic.UserId,
                Name = topic.User.Name,
                Email = topic.User.Email,
                UserName = topic.User.Account.UserName,
                RoleName = topic.User.Account.Role.RoleName,
                Images = JsonSerializer.Deserialize<List<GetTopicImagesResponse>>(topic.Images),
                Videos = JsonSerializer.Deserialize<List<GetTopicVideoLinkResponse>>(topic.Videos)
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
                    CreateDate = topic.CreateDate,
                    UserId = topic.UserId,
                    Name = topic.User.Name,
                    Email = topic.User.Email,
                    UserName = topic.User.Account.UserName,
                    RoleName = topic.User.Account.Role.RoleName,
                    Images = JsonSerializer.Deserialize<List<GetTopicImagesResponse>>(topic.Images),
                    Videos = JsonSerializer.Deserialize<List<GetTopicVideoLinkResponse>>(topic.Videos)
                });
            }
            return topicListDTO;
        }
    }
}
