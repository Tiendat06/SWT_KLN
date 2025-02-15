using Application.DTOs;
using Application.DTOs.Topic.Output;

namespace Application.Interfaces
{
    public interface ITopicService
    {
        Task<IEnumerable<GetTopicResponse>> GetAllTopicsAsync(GetAllTopicRequest input);
        Task<GetTopicResponse?> GetTopicByIdAsync(Guid id);
    }
}
