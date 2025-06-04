using Domain.Entities;

namespace Application.Mapper.Magazines.Input
{
    public class AddMagazineRequestMapper
    {
        public static Magazine AddMagazineMapDTOToEntity(AddMagazineRequest addMagazineRequest, string magazineImage, string magazineContent, Guid guid)
        {
            return new Magazine
            {
                MagazineId = guid,
                Title = addMagazineRequest.Title,
                MediaTypeId = addMagazineRequest.MediaTypeId,
                MagazineContent = magazineContent,
                Image = magazineImage,
                UserId = addMagazineRequest.UserId,
            };
        }
    }
}
