using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMagazineRepository
    {
        Task<IEnumerable<Magazine>> GetAllMagazinesAsync(int page, int fetch);
        Task<Magazine?> GetMagazineByIdAsync(Guid id);
        Task CreateMagazineAsync(Magazine magazine);
        Task HardDeleteMagazineAsync(Guid id);
        Task SoftDeleteMagazineAsync(Magazine magazine);
    }
}
