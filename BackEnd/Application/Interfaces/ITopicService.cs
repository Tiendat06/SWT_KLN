﻿using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface ITopicService
    {
        Task<PaginationResponseDto<GetTopicResponse>> GetAllTopicsAsync(GetAllTopicRequest input);
        Task<GetTopicResponse?> GetTopicByIdAsync(Guid id);
    }
}
