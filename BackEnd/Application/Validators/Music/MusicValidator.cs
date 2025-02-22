using Application.Interfaces;

namespace Application.Validators
{
    public class MusicValidator : IMusicValidator
    {
        private readonly IMusicService _musicService;
        public MusicValidator(IMusicService musicService)
        {
            _musicService = musicService;
        }
    }
}
