using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.SlideImage.Output;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface ISlideImageService
    {
        Task<IEnumerable<GetSlideImageResponse>> GetAllSlideImagesAsync();
        Task<GetSlideImageResponse?> GetSlideImageByIdAsync(Guid id);
    }
}
