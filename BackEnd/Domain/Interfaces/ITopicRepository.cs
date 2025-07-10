using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ITopicRepository
    {
        Task<IEnumerable<Topic>> GetAllTopicsAsync(int page, int fetch, int type, int topicType);
        Task<Topic?> GetTopicByIdAsync(Guid id);
        Task<List<Topic>> GetTopicByIdsAsync(List<Guid> ids);
        Task<int> CountTopicAsync(int type, int topicType);
        Task CreateTopicAsync(Topic topic);
        Task SoftDeleteMultipleTopicByIdsAsync(List<Guid> ids);
    }
}