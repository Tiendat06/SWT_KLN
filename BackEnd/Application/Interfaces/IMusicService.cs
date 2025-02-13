using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Music.Input;
using Application.DTOs.Music.Output;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IMusicService
    {
        Task<IEnumerable<GetMusicResponse>> GetAllMusicAsync(GetMusicRequest input);
        Task<GetMusicResponse?> GetMusicByIdAsync(Guid id);
    }
}
