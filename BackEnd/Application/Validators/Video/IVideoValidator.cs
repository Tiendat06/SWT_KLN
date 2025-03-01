namespace Application.Validators
{
    public interface IVideoValidator
    {
        Task<GetVideoResponse> CreateVideoAsyncValidator(AddVideoRequest addVideoRequest);
        Task<GetVideoResponse> UpdateVideoAsyncValidator(Guid id, UpdateVideoRequest updateVideoRequest);
    }
}
