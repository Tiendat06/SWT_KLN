using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Application;
using Domain.Entities;

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
                TopicMedias = topic.TopicMedias?.Select(media => new GetTopicMediaResponse
                {
                    TopicMediaId = media.TopicMediaId,
                    TopicId = media.TopicId,
                    ImageLink = media.ImageLink,
                    VideoLink = media.VideoLink,
                    Title = media.Title
                }).ToList() ?? new List<GetTopicMediaResponse>()
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
                    TopicMedias = topic.TopicMedias?.Select(media => new GetTopicMediaResponse
                    {
                        TopicMediaId = media.TopicMediaId,
                        TopicId = media.TopicId,
                        ImageLink = media.ImageLink,
                        VideoLink = media.VideoLink,
                        Title = media.Title
                    }).ToList() ?? new List<GetTopicMediaResponse>()
                });
            }
            return topicListDTO;
        }
    }
}
