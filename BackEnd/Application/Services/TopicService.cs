using Application.Interfaces;
using Application.Mapper.Topics.Output;
using Domain;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Application.Extension;
using Microsoft.Extensions.Localization;
using Domain.Localization;

namespace Application.Services
{
    public class TopicService : ITopicService
    {
        #region Fields
        private readonly ITopicRepository _topicRepository;
        //private readonly ILogTopicRepository _logTopicRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public TopicService(
            Domain.Interfaces.ITopicRepository topicRepository,
            IUnitOfWork unitOfWork,
            //ILogTopicRepository logTopicRepository,
            Cloudinary cloudinary,
            IConfiguration configuration,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _topicRepository = topicRepository;
            _unitOfWork = unitOfWork;
            //_logTopicRepository = logTopicRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
            _localizer = localizer;
        }
        #endregion
        public async Task<IEnumerable<GetTopicResponse>> GetAllTopicsAsync(GetAllTopicRequest input)
        {
            var page = input.Page;
            var fetch = input.Fetch;
            var topics = await _topicRepository.GetAllTopicsAsync(page, fetch);

            return GetTopicResponseMapper.GetTopicListMapEntityToDTO(topics);
        }

        public async Task<GetTopicResponse?> GetTopicByIdAsync(Guid id)
        {
            var topic = await _topicRepository.GetTopicByIdAsync(id) ?? throw new KeyNotFoundException(CommonExtensions.GetValidateMessage(_localizer["NotFound"], _localizer["Topic"]));

            return GetTopicResponseMapper.GetTopicMapEntityToDTO(topic);
        }
    }
}
