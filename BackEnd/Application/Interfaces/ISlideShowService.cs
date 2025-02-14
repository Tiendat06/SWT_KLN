using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;
using Application.DTOs.SlideShow.Output;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface ISlideShowService
    {
        Task<IEnumerable<GetSlideShowResponse>> GetAllSlideShowsAsync(GetSlideShowRequest input);
        Task<GetSlideShowResponse?> GetSlideShowByIdAsync(Guid id);
    }
}
