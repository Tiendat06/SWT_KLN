using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ISlideShowRepository
    {
        Task<IEnumerable<SlideShow>> GetAllSlideShowsAsync(int page, int fetch, int type, int slideShowType);
        Task<SlideShow?> GetSlideShowByIdAsync(Guid id);
        Task<List<SlideShow>> GetSlideShowsByIdsAsync(List<Guid> ids);
        Task<int> CountSlideShowAsync(int type, int slideShowType);
        Task<int> CountSlideImageInSpecificSlideShow(int type, int slideShowType);
        Task CreateSlideShowAsync(SlideShow slideShow);
        Task HardDeleteSlideShowAsync(Guid id);
        Task SoftDeleteSlideShowAsync(SlideShow slideShow);

        Task SoftDeleteSlideShowsAsync(List<SlideShow> slideShows);
    }
}
