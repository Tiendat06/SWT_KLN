using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface IMagazineService
    {
        Task<PaginationResponseDto<GetMagazineResponse>> GetAllMagazinesAsync(GetAllMagazineRequest input);
        Task<GetMagazineResponse> GetMagazineByIdAsync(Guid id);
        Task<GetMagazineResponse> CreateMagazineAsync(AddMagazineRequest addMagazineRequest);
        Task<bool> DeleteMagazineAsync(Guid id);
        Task<bool> DeleteMultipleMagazinesAsync(List<Guid> ids);
        Task<GetMagazineResponse> UpdateMagazineAsync(Guid id, UpdateMagazineRequest updateMagazineRequest);
    }
}
