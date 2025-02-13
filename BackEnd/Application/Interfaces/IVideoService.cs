using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Video.Output;
using Application.DTOs.Video.Input;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IVideoService
    {
        Task<IEnumerable<GetVideoResponse>> GetAllVideosAsync(GetVideoRequest input);
        Task<GetVideoResponse?> GetVideoByIdAsync(Guid id);
    }
}
