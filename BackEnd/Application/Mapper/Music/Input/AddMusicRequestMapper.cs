using Domain.Entities;

namespace Application.Mapper.Musics.Input
{
    public class AddMusicRequestMapper
    {
        public static Music AddMusicMapDTOToEntity(AddMusicRequest addMusicRequest, string musicImage, string musicAudio, Guid guid)
        {
            return new Music
            {
                MusicId = guid,
                Title = addMusicRequest.Title,
                MediaTypeId = addMusicRequest.MediaTypeId,
                Author = addMusicRequest.Author,
                ImageLink = musicImage,
                AudioLink = musicAudio,
                UserId = addMusicRequest.UserId,
            };
        }
    }
}
