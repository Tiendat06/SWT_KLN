using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.SlideImage.Output;
using Domain.Entities;

namespace Application.Mapper.SlideImages.Output
{
    public class GetSlideImageResponseMapper
    {
        public static GetSlideImageResponse GetSlideImageMapEntityToDTO(SlideImage slideImage)
        {
            return new GetSlideImageResponse
            {
                SlideImageId = slideImage.SlideImageId,
                ImageLink = slideImage.ImageLink,
                Capture = slideImage.Capture,
                SlideShowId = slideImage.SlideShowId,
                Title = slideImage.SlideShow.Title,
                CreateDate = slideImage.SlideShow.CreateDate,
                UserId = slideImage.SlideShow.UserId,
                Name = slideImage.SlideShow.User.Name,
                Email = slideImage.SlideShow.User.Email,
                UserName = slideImage.SlideShow.User.Account.UserName,
                RoleName = slideImage.SlideShow.User.Account.Role.RoleName
            };
        }
        public static IEnumerable<GetSlideImageResponse> GetSlideImageListMapEntityToDTO(IEnumerable<SlideImage> slideImages)
        {
            List<GetSlideImageResponse> slideImageListDTO = new();
            foreach (var slideImage in slideImages)
            {
                slideImageListDTO.Add(new GetSlideImageResponse
                {
                    SlideImageId = slideImage.SlideImageId,
                    ImageLink = slideImage.ImageLink,
                    Capture = slideImage.Capture,
                    SlideShowId = slideImage.SlideShowId,
                    Title = slideImage.SlideShow.Title,
                    CreateDate = slideImage.SlideShow.CreateDate,
                    UserId = slideImage.SlideShow.UserId,
                    Name = slideImage.SlideShow.User.Name,
                    Email = slideImage.SlideShow.User.Email,
                    UserName = slideImage.SlideShow.User.Account.UserName,
                    RoleName = slideImage.SlideShow.User.Account.Role.RoleName
                });
            }
            return slideImageListDTO;
        }
    }
} 
