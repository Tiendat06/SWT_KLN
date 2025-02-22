
namespace Application.Interfaces
{
    public interface IMusicService
    {
        Task<IEnumerable<GetMusicResponse>> GetAllMusicAsync(GetMusicRequest input);
        Task<GetMusicResponse?> GetMusicByIdAsync(Guid id);
    }
}
