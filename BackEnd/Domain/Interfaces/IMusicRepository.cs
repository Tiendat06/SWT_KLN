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
        Task<int> CountMusicAsync(int type);
        Task CreateMusicAsync(Music music);
        Task SoftDeleteMusicAsync(Music music);
        Task HardDeleteMusicAsync(Music music);
    }
}
