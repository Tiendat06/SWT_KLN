namespace Application.Validators
{
    public interface ISlideShowValidator
    {
        Task<GetSlideShowResponse> CreateSlideShowAsyncValidator(AddSlideShowRequest addSlideShowRequest);
        Task<GetSlideShowResponse> UpdateSlideShowAsyncValidator(Guid id, UpdateSlideShowRequest updateSlideShowRequest);
        Task<GetSlideImageListResponse> CreateSlideImageAsyncValidator(AddSlideImagesRequest addSlideImageRequest);
        Task<GetSlideImageListResponse> UpdateSlideImageAsyncValidator(UpdateSlideImagesRequest request);
    }
}
