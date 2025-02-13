using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.SlideImage.Output;
using Application.DTOs.SlideShow.Output;
using Domain.Entities;

namespace Application.Mapper.SlideShows.Output
{
    public class GetSlideShowResponseMapper
    {
        public static GetSlideShowResponse GetSlideShowMapEntityToDTO(SlideShow slideShow)
        {
            //return new GetSlideShowResponse
            //{
            //    SlideShowId = slideShow.SlideShowId,
            //    Title = slideShow.Title,
            //    Image = slideShow.Image,
            //    CreateDate = slideShow.CreateDate,
            //    UserId = slideShow.UserId,
            //    Name = slideShow.User.Name,
            //    Email = slideShow.User.Email,
            //    UserName = slideShow.User.Account.UserName,
            //    RoleName = slideShow.User.Account.Role.RoleName
            //};

            return new GetSlideShowResponse
            {
                SlideShowId = slideShow.SlideShowId,
                Title = slideShow.Title,
                CreateDate = slideShow.CreateDate,
                Image = slideShow.Image,
                UserId = slideShow.UserId,
                Name = slideShow.User.Name,
                Email = slideShow.User.Email,
                UserName = slideShow.User.Account.UserName,
                RoleName = slideShow.User.Account.Role.RoleName,
                SlideImages = slideShow.SlideImages?.Select(slideImage => new GetSlideImageResponse
                {
                    SlideImageId = slideImage.SlideImageId,
                    SlideShowId = slideImage.SlideShowId,
                    ImageLink = slideImage.ImageLink,
                    Capture = slideImage.Capture,
                }).ToList() ?? new List<GetSlideImageResponse>()
            };
        }
        public static IEnumerable<GetSlideShowResponse> GetSlideShowListMapEntityToDTO(IEnumerable<SlideShow> slideShows)
        {
            List<GetSlideShowResponse> slideShowListDTO = new();
            foreach (var slideShow in slideShows)
            {
                slideShowListDTO.Add(new GetSlideShowResponse
                {
                    //SlideShowId = slideShow.SlideShowId,
                    //Title = slideShow.Title,
                    //Image = slideShow.Image,
                    //CreateDate = slideShow.CreateDate,
                    //UserId = slideShow.UserId,
                    //Name = slideShow.User.Name,
                    //Email = slideShow.User.Email,
                    //UserName = slideShow.User.Account.UserName,
                    //RoleName = slideShow.User.Account.Role.RoleName

                    SlideShowId = slideShow.SlideShowId,
                    Title = slideShow.Title,
                    Image = slideShow.Image,
                    CreateDate = slideShow.CreateDate,
                    UserId = slideShow.UserId,
                    Name = slideShow.User.Name,
                    Email = slideShow.User.Email,
                    UserName = slideShow.User.Account.UserName,
                    RoleName = slideShow.User.Account.Role.RoleName,
                    SlideImages = slideShow.SlideImages?.Select(slideImage => new GetSlideImageResponse
                    {
                        SlideImageId = slideImage.SlideImageId,
                        SlideShowId = slideImage.SlideShowId,
                        ImageLink = slideImage.ImageLink,
                        Capture = slideImage.Capture,
                    }).ToList() ?? new List<GetSlideImageResponse>()
                });
            }
            return slideShowListDTO;
        }
    }
}
