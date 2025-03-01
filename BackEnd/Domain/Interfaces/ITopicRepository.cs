using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ITopicRepository
    {
        Task<IEnumerable<Topic>> GetAllTopicsAsync(int page, int fetch);
        Task<Topic?> GetTopicByIdAsync(Guid id);
        Task<int> CountTopicAsync();
    }
}