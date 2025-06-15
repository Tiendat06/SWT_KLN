namespace Application.Validators
{
    public interface ISlideShowValidator
    {
        Task<GetSlideShowResponse> CreateSlideShowAsyncValidator(AddSlideShowRequest addSlideShowRequest);
        Task<GetSlideShowResponse> UpdateSlideShowAsyncValidator(Guid id, UpdateSlideShowRequest updateSlideShowRequest);
        Task<GetSlideImageResponse> CreateSlideImageAsyncValidator(AddSlideImageRequest addSlideImageRequest);
        Task<GetSlideImageResponse> UpdateSlideImageAsyncValidator(UpdateSlideImageRequest request);
    }
}
