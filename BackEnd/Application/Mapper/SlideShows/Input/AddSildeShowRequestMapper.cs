using Domain.Entities;
using System.Text.Json;

namespace Application.Mapper.SlideShows.Input
{
    public class AddSlideShowRequestMapper
    {
        public static SlideShow AddSlideShowMapDTOToEntity(AddSlideShowRequest addSlideShowRequest, string image, List<(string ImageUrl, string Capture)> slideImages, Guid guid)
        {
            return new SlideShow
            {
                SlideShowId = guid,
                Title = addSlideShowRequest.Title,
                Description = addSlideShowRequest.Description,
                Image = image,
                UserId = addSlideShowRequest.UserId,
                MediaTypeId = addSlideShowRequest.MediaTypeId,
                SlideShowTypeId = addSlideShowRequest.SlideShowTypeId,
                SlideImage = JsonSerializer.Serialize(slideImages.Select((img, index) => new GetSlideImageResponse
                {
                    Id = index + 1,
                    Capture = img.Capture,
                    ImageLink = img.ImageUrl
                }))
            };
        }
    }
}
