using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMagazineRepository
    {
        Task<IEnumerable<Magazine>> GetAllMagazinesAsync(int page, int fetch, int type);
        Task<Magazine?> GetMagazineByIdAsync(Guid id);
        Task<List<Magazine>> GetMagazinesByIdsAsync(List<Guid> ids);
        Task CreateMagazineAsync(Magazine magazine);
        Task HardDeleteMagazineAsync(Guid id);
        Task SoftDeleteMagazineAsync(Magazine magazine);
        Task SoftDeleteMultipleMagazineByIdsAsync(List<Guid> ids);
        Task<int> CountMagazineAsync(int type);
        Task<Magazine?> GetMagazineByTitleAsync(string magazineTitle);
    }
}
