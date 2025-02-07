using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.SolemnVisit.Output;
using Domain.Entities;

namespace Application.Mapper.SolemnVisits.Output
{
    public class GetSolemnVisitResponseMapper
    {
        public static GetSolemnVisitResponse GetSolemnVisitMapEntityToDTO(SolemnVisit solemnVisit)
        {
            return new GetSolemnVisitResponse
            {
                SolemnVisitId = solemnVisit.VisitId,
                SolemnVisitName = solemnVisit.Name,
                PortraitImage = solemnVisit.PortraitImage,
                LetterImage = solemnVisit.LetterImage,
                CreateDate = solemnVisit.CreateDate,
                UserId = solemnVisit.UserId,
                Name = solemnVisit.User.Name,
                Email = solemnVisit.User.Email,
                UserName = solemnVisit.User.Account.UserName,
                RoleName = solemnVisit.User.Account.Role.RoleName
            };
        }

        public static IEnumerable<GetSolemnVisitResponse> GetSolemnVisitListMapEntityToDTO(IEnumerable<SolemnVisit> solemnVisits)
        {
            List<GetSolemnVisitResponse> solemnVisitListDTO = new();
            foreach (var solemnVisit in solemnVisits)
            {
                solemnVisitListDTO.Add(new GetSolemnVisitResponse
                {
                    SolemnVisitId = solemnVisit.VisitId,
                    SolemnVisitName = solemnVisit.Name,
                    PortraitImage = solemnVisit.PortraitImage,
                    LetterImage = solemnVisit.LetterImage,
                    CreateDate = solemnVisit.CreateDate,
                    UserId = solemnVisit.UserId,
                    Name = solemnVisit.User.Name,
                    Email = solemnVisit.User.Email,
                    UserName = solemnVisit.User.Account.UserName,
                    RoleName = solemnVisit.User.Account.Role.RoleName
                });
            }
            return solemnVisitListDTO;
        }
    }
}
