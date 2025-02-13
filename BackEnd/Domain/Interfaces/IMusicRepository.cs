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
        Task<IEnumerable<Music>> GetAllMusicAsync(int fetch, int page);
        Task<Music?> GetMusicByIdAsync(Guid id);
    }
}
