using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ISlideImageRepository
    {
        Task<IEnumerable<SlideImage>> GetAllSlideImagesAsync();
        Task<SlideImage?> GetSlideImageByIdAsync(Guid id);
    }
}
