using Domain.Entities;

namespace Application.Mapper.Musics.Output
{
    public class GetMusicResponseMapper
    {
        public static GetMusicResponse GetMusicMapEntityToDTO(Music music)
        {
            return new GetMusicResponse
            {
                MusicId = music.MusicId,
                MusicTitle = music.Title,
                MediaTypeId = music.MediaTypeId,
                MusicAuthor = music.Author,
                MusicCreateDate = music.CreateDate,
                ImageLink = music.ImageLink,
                AudioLink = music.AudioLink,
                UserId = music.UserId,
                Name = music.User.Name,
                Email = music.User.Email,
                UserName = music.User.Account.UserName,
                RoleName = music.User.Account.Role.RoleName
            };
        }
        public static IEnumerable<GetMusicResponse> GetMusicListMapEntityToDTO(IEnumerable<Music> musics) 
        {
            List<GetMusicResponse> musicListDTO = new();
            foreach (var music in musics)
            {
                musicListDTO.Add(new GetMusicResponse
                {
                    MusicId = music.MusicId,
                    MusicTitle = music.Title,
                    MediaTypeId = music.MediaTypeId,
                    MusicAuthor = music.Author,
                    MusicCreateDate = music.CreateDate,
                    ImageLink = music.ImageLink,
                    AudioLink = music.AudioLink,
                    UserId = music.UserId,
                    Name = music.User.Name,
                    Email = music.User.Email,
                    UserName = music.User.Account.UserName,
                    RoleName = music.User.Account.Role.RoleName
                });
            }
            return musicListDTO;
        }
    }
}
