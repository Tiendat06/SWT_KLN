using Domain.Entities;

namespace Application.Mapper.Videos.Input
{
    public class AddVideoRequestMapper
    {
        public static Video AddVideoMapDTOToEntity(AddVideoRequest addVideoRequest, string videoLink, string imageLink, Guid guid)
        {
            return new Video
            {
                VideoId = guid,
                Title = addVideoRequest.Title,
                MediaTypeId = addVideoRequest.MediaTypeId,
                VideoLink = videoLink,
                ImageLink = imageLink,
                UserId = addVideoRequest.UserId,
            };
        }
    }
}
