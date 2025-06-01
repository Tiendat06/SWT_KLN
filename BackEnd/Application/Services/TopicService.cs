using Application.Interfaces;
using Application.Mapper.Topics.Output;
using Domain;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns;

namespace Application.Services
{
    public class TopicService(
        ITopicRepository _topicRepository,
        IConfiguration _configuration,
        IUnitOfWork _unitOfWork,
        Cloudinary _cloudinary,
        IStringLocalizer<KLNSharedResources> _localizer
        ) : ITopicService
    {
        public async Task<PaginationResponseDto<GetTopicResponse>> GetAllTopicsAsync(GetAllTopicRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var type = input.Type;
            var topicType = input.TopicType;
            var topics = await _topicRepository.GetAllTopicsAsync(page, fetch, type, topicType);
            var totalTopic = await _topicRepository.CountTopicAsync(type, topicType);
            var topicMapper = GetTopicResponseMapper.GetTopicListMapEntityToDTO(topics);
            return new PaginationResponseDto<GetTopicResponse>(totalTopic, topicMapper);
        }

        public async Task<GetTopicResponse?> GetTopicByIdAsync(Guid id)
        {
            var topic = await _topicRepository.GetTopicByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Topic"]));

            return GetTopicResponseMapper.GetTopicMapEntityToDTO(topic);
        }
    }
}
