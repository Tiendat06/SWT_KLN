using Application.Interfaces;
using Domain.Localization;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;

namespace Application.Validators
{
    public class TopicValidator : ITopicValidator
    {
        private readonly ITopicService _topicService;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public TopicValidator(ITopicService topicService, IStringLocalizer<KLNSharedResources> localizer)
        {
            _topicService = topicService;
            _localizer = localizer;
        }

        public async Task<GetTopicResponse> CreateTopicAsyncValidator(AddTopicRequest addTopicRequest)
        {
            var validator = new AddTopicRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(addTopicRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _topicService.CreateTopicAsync(addTopicRequest);
        }

        public async Task<GetTopicResponse> UpdateTopicAsyncValidator(Guid id, UpdateTopicRequest updateTopicRequest)
        {
            var validator = new UpdateTopicRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(updateTopicRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _topicService.UpdateTopicAsync(id, updateTopicRequest);
        }

        public async Task<GetTopicMediaResponse> AddTopicMediaAsyncValidator(AddTopicMediaRequest addTopicMediaRequest)
        {
            var validator = new AddTopicMediaRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(addTopicMediaRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _topicService.AddTopicMediaAsync(addTopicMediaRequest);
        }

        public async Task<GetTopicMediaResponse> UpdateTopicMediaAsyncValidator(UpdateTopicMediaRequest updateTopicMediaRequest)
        {
            var validator = new UpdateTopicMediaRequestValidator(_localizer);
            ValidationResult result = await validator.ValidateAsync(updateTopicMediaRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _topicService.UpdateTopicMediaAsync(updateTopicMediaRequest);
        }

        //public async Task<GetTopicResponse> UpdateTopicAsyncValidator(Guid id, UpdateTopicRequest updateTopicRequest)
        //{
        //    var validator = new UpdateTopicRequestValidator(_localizer);
        //    ValidationResult result = await validator.ValidateAsync(updateTopicRequest);
        //    if (!result.IsValid)
        //    {
        //        var error = result.Errors.FirstOrDefault();
        //        throw new ArgumentException(error + "");
        //    }
        //    else if (id == null)
        //    {
        //        throw new ArgumentNullException(CommonExtensions.GetValidateMessage(_localizer["InvalidValue"], _localizer["TopicId"]));
        //    }
        //    return await _topicService.UpdateTopicAsync(id, updateTopicRequest);
        //}
    }
}
