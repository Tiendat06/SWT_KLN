﻿
namespace Application.Interfaces
{
    public interface IMagazineService
    {
        Task<IEnumerable<GetMagazineResponse>> GetAllMagazinesAsync(GetAllMagazineRequest input);
        Task<GetMagazineResponse> GetMagazineByIdAsync(Guid id);
        Task<GetMagazineResponse> CreateMagazineAsync(AddMagazineRequest addMagazineRequest);
        Task<bool> DeleteMagazineAsync(Guid id);
        Task<GetMagazineResponse> UpdateMagazineAsync(Guid id, UpdateMagazineRequest updateMagazineRequest);
    }
}
