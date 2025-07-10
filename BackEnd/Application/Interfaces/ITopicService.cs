using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface ITopicService
    {
        Task<PaginationResponseDto<GetTopicResponse>> GetAllTopicsAsync(GetAllTopicRequest input);
        Task<GetTopicResponse?> GetTopicByIdAsync(Guid id);
        Task<GetTopicResponse> CreateTopicAsync(AddTopicRequest addTopicRequest);
        Task<GetTopicResponse> UpdateTopicAsync(Guid id, UpdateTopicRequest updateTopicRequest);
    }
}
