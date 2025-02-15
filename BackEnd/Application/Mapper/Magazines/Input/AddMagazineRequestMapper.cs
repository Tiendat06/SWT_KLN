using Application;
using Domain.Entities;

namespace Application.Mapper.Magazines.Input
{
    public class AddMagazineRequestMapper
    {
        public static Magazine AddMagazineMapDTOToEntity(AddMagazineRequest addMagazineRequest, string magazineImage, Guid guid)
        {
            return new Magazine
            {
                MagazineId = guid,
                Title = addMagazineRequest.Title,
                MagazineContent = addMagazineRequest.MagazineContent,
                Image = magazineImage,
                UserId = addMagazineRequest.UserId,
            };
        }
    }
}
