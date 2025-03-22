using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface IMusicService
    {
        Task<PaginationResponseDto<GetMusicResponse>> GetAllMusicAsync(GetMusicRequest input);
        Task<GetMusicResponse?> GetMusicByIdAsync(Guid id);
    }
}
