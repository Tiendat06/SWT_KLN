using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMagazineRepository
    {
        Task<IEnumerable<Magazine>> GetAllMagazinesAsync();
        Task<Magazine?> GetMagazineByIdAsync(Guid id);
        Task CreateMagazineAsync(Magazine magazine);
        Task HardDeleteMagazineAsync(Guid id);
        Task SoftDeleteMagazineAsync(Magazine magazine);
    }
}
