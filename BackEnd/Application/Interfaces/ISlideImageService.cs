
namespace Application.Interfaces
{
    public interface ISlideImageService
    {
        Task<IEnumerable<GetSlideImageResponse>> GetAllSlideImagesAsync();
        Task<GetSlideImageResponse?> GetSlideImageByIdAsync(Guid id);
    }
}
