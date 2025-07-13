using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IVideoRepository
    {
        Task<IEnumerable<Video>> GetAllVideosAsync(int page, int fetch, int type);
        Task<Video?> GetVideoByIdAsync(Guid id);
        Task<int> CountVideoAsync(int type);
        Task CreateVideoAsync(Video video);
        Task HardDeleteVideoAsync(Guid id);
        Task SoftDeleteVideoAsync(Video video);
        Task<List<Video>> GetVideoByIdsAsync(List<Guid> ids);
        Task SoftDeleteMultipleVideoByIdsAsync(List<Guid> ids);
        Task<Video?> GetVideoByTitleAsync(string videoTitle);
    }
}
