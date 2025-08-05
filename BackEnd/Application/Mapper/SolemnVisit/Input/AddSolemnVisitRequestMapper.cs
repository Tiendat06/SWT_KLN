using Domain.Entities;
using System.Text.Json;

namespace Application.Mapper.SolemnVisits.Input
{
    public class AddSolemnVisitRequestMapper
    {
        public static SolemnVisit AddSolemnVisitMapDTOToEntity(AddSolemnVisitRequest addSolemnVisitRequest, string image, string portraitImage, string letterImage, Guid guid)
        {
            return new SolemnVisit
            {
                VisitId = guid,
                Name = addSolemnVisitRequest.Name,
                PortraitImage = portraitImage,
                LetterImage = letterImage,
                UserId = addSolemnVisitRequest.UserId,
            };
        }
    }
}
