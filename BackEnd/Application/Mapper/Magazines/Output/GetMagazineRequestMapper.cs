using Domain.Entities;

namespace Application.Mapper.Magazines.Output
{
    public class GetMagazineResponseMapper
    {
        public static GetMagazineResponse GetMagazineMapEntityToDTO(Magazine magazine)
        {
            return new GetMagazineResponse
            {
                MagazineId = magazine.MagazineId,
                Title = magazine.Title,
                MagazineContent = magazine.MagazineContent,
                Image = magazine.Image,
                CreateDate = magazine.CreateDate,
                UserId = magazine.UserId,
                Name = magazine.User.Name,
                Email = magazine.User.Email,
                UserName = magazine.User.Account.UserName,
                RoleName = magazine.User.Account.Role.RoleName
            };
        }

        public static IEnumerable<GetMagazineResponse> GetMagazineListMapEntityToDTO(IEnumerable<Magazine> magazines)
        {
            List<GetMagazineResponse> magazineListDTO = [];
            foreach (var magazine in magazines)
            {
                magazineListDTO.Add(new GetMagazineResponse
                {
                    MagazineId = magazine.MagazineId,
                    Title = magazine.Title,
                    MagazineContent = magazine.MagazineContent,
                    Image = magazine.Image,
                    CreateDate = magazine.CreateDate,
                    Name = magazine.User.Name,
                    Email = magazine.User.Email,
                    UserName = magazine.User.Account.UserName,
                    RoleName = magazine.User.Account.Role.RoleName
                });
            }
            return magazineListDTO;
        }
    }
}
