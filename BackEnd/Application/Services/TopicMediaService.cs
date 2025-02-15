using Application.Interfaces;
using Application.Mapper.TopicMedias.Output;
using Domain;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using Domain.Localization;

namespace Application.Services
{
    public class TopicMediaService : ITopicMediaService
    {
        #region Fields
        private readonly Domain.Interfaces.ITopicMediaRepository _topicMediaRepository;
        //private readonly ILogTopicMediaRepository _logTopicMediaRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Cloudinary _cloudinary;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        #endregion

        #region Constructor
        public TopicMediaService(
            Domain.Interfaces.ITopicMediaRepository topicMediaRepository,
            IUnitOfWork unitOfWork,
            //ILogTopicMediaRepository logTopicMediaRepository,
            Cloudinary cloudinary,
            IConfiguration configuration,
            IStringLocalizer<KLNSharedResources> localizer
        )
        {
            _topicMediaRepository = topicMediaRepository;
            _unitOfWork = unitOfWork;
            //_logTopicMediaRepository = logTopicMediaRepository;
            _cloudinary = cloudinary;
            _configuration = configuration;
            _localizer = localizer;
        }
        #endregion
        public async Task<IEnumerable<GetTopicMediaResponse>> GetTopicMediaByTopicIdAsync(Guid id, string mediaType)
        {

            var topicMedias = await _topicMediaRepository.GetTopicMediaByTopicIdAsync(id, mediaType);

            return GetTopicMediaResponseMapper.GetTopicMediaListMapEntityToDTO(topicMedias);
        }
    }
}
