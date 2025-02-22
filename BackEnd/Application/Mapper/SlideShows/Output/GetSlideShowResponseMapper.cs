using Domain.Entities;
using System.Text.Json;

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
                SlideImage = slideShow.SlideImage != null ? JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage) : new List<GetSlideImageResponse>()
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
                    SlideImage = slideShow.SlideImage != null ? JsonSerializer.Deserialize<List<GetSlideImageResponse>>(slideShow.SlideImage) : new List<GetSlideImageResponse>()
                });
            }
            return slideShowListDTO;
        }
    }
}
