using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.SlideShow.Output;
using Domain.Entities;

namespace Application.Mapper.SlideShows.Output
{
    public class GetSlideShowResponseMapper
    {
        public static GetSlideShowResponse GetSlideShowMapEntityToDTO(SlideShow slideShow)
        {
            return new GetSlideShowResponse
            {
                SlideShowId = slideShow.SlideShowId,
                Title = slideShow.Title,
                Image = slideShow.Image,
                CreateDate = slideShow.CreateDate,
                UserId = slideShow.UserId,
                Name = slideShow.User.Name,
                Email = slideShow.User.Email,
                UserName = slideShow.User.Account.UserName,
                RoleName = slideShow.User.Account.Role.RoleName
            };
        }
        public static IEnumerable<GetSlideShowResponse> GetSlideShowListMapEntityToDTO(IEnumerable<SlideShow> slideShows)
        {
            List<GetSlideShowResponse> slideShowListDTO = [];
            foreach (var slideShow in slideShows)
            {
                slideShowListDTO.Add(new GetSlideShowResponse
                {
                    SlideShowId = slideShow.SlideShowId,
                    Title = slideShow.Title,
                    Image = slideShow.Image,
                    CreateDate = slideShow.CreateDate,
                    UserId = slideShow.UserId,
                    Name = slideShow.User.Name,
                    Email = slideShow.User.Email,
                    UserName = slideShow.User.Account.UserName,
                    RoleName = slideShow.User.Account.Role.RoleName
                });
            }
            return slideShowListDTO;
        }
    }
}
