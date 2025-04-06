using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface IMusicService
    {
        Task<PaginationResponseDto<GetMusicResponse>> GetAllMusicAsync(GetMusicRequest input);
        Task<GetMusicResponse?> GetMusicByIdAsync(Guid id);
        Task<GetMusicResponse> CreateMusicAsync(AddMusicRequest addMusicRequest);
        Task<GetMusicResponse> UpdateMusicAsync(Guid id, UpdateMusicRequest updateMusicRequest);
        Task<bool> DeleteMultipleMusicAsync(List<Guid> ids);
    }
}
