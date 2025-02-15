using Application.DTOs;
using Application.DTOs.Topic.Output;
using Application.DTOs.TopicMedia.Output;

namespace Application.Interfaces
{
    public interface ITopicMediaService
    {
        Task<IEnumerable<GetTopicMediaResponse>> GetTopicMediaByTopicIdAsync(Guid id, string mediaType);
    }
}
