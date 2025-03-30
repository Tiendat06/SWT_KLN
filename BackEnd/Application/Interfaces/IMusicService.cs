
namespace Application.Interfaces
{
    public interface IMusicService
    {
        Task<IEnumerable<GetMusicResponse>> GetAllMusicAsync(GetMusicRequest input);
        Task<GetMusicResponse?> GetMusicByIdAsync(Guid id);
        Task<GetMusicResponse> CreateMusicAsync(AddMusicRequest addMusicRequest);
        Task<GetMusicResponse> UpdateMusicAsync(Guid id, UpdateMusicRequest updateMusicRequest);
    }
}
