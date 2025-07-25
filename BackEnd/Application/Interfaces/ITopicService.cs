﻿using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface ITopicService
    {
        Task<PaginationResponseDto<GetTopicResponse>> GetAllTopicsAsync(GetAllTopicRequest input);
        Task<GetTopicResponse?> GetTopicByIdAsync(Guid id);
        Task<GetTopicResponse> CreateTopicAsync(AddTopicRequest addTopicRequest);
        Task<GetTopicResponse> UpdateTopicAsync(Guid id, UpdateTopicRequest updateTopicRequest);
        Task<bool> DeleteMultipleTopicAsync(List<Guid> ids);
        Task<GetTopicMediaResponse> AddTopicMediaAsync(AddTopicMediaRequest addTopicMediaRequest);
        Task<GetTopicMediaResponse> UpdateTopicMediaAsync(UpdateTopicMediaRequest updateTopicMediaRequest);
        Task<GetTopicMediaResponse> DeleteTopicMediaAsync(DeleteTopicMediaRequest request);
    }
}
