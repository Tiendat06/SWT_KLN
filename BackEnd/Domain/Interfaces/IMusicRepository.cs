using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMusicRepository
    {
        Task<IEnumerable<Music>> GetAllMusicAsync(int fetch, int page, int type);
        Task<Music?> GetMusicByIdAsync(Guid id);
        Task<List<Music>> GetMusicByIdsAsync(List<Guid> ids);
        Task<int> CountMusicAsync(int type);
        Task CreateMusicAsync(Music music);
        Task SoftDeleteMusicAsync(Music music);
        Task SoftDeleteMultipleMusicByIdsAsync(List<Guid> ids);
        Task HardDeleteMusicAsync(Music music);
    }
}
