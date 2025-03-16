using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMagazineRepository
    {
        Task<IEnumerable<Magazine>> GetAllMagazinesAsync(int page, int fetch, int type);
        Task<Magazine?> GetMagazineByIdAsync(Guid id);
        Task CreateMagazineAsync(Magazine magazine);
        Task HardDeleteMagazineAsync(Guid id);
        Task SoftDeleteMagazineAsync(Magazine magazine);
        Task<int> CountMagazineAsync(int type);
    }
}
