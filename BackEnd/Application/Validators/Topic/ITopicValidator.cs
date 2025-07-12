namespace Application.Validators
{
    public interface ITopicValidator
    {
        //Task<GetTopicResponse> CreateTopicAsyncValidator(AddTopicRequest addTopicRequest);
        //Task<GetTopicResponse> UpdateTopicAsyncValidator(Guid id, UpdateTopicRequest updateTopicRequest);
        Task<GetTopicResponse> CreateTopicAsyncValidator(AddTopicRequest addTopicRequest);
        Task<GetTopicResponse> UpdateTopicAsyncValidator(Guid id, UpdateTopicRequest updateTopicRequest);
        Task<GetTopicMediaResponse> AddTopicMediaAsyncValidator(AddTopicMediaRequest addTopicMediaRequest);
        Task<GetTopicMediaResponse> UpdateTopicMediaAsyncValidator(UpdateTopicMediaRequest updateTopicMediaRequest);
    }
}
