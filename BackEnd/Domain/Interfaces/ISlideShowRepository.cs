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
        Task<IEnumerable<SlideShow>> GetAllSlideShowsAsync();
        Task<SlideShow?> GetSlideShowByIdAsync(Guid id);
    }
}
