﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IVideoRepository
    {
        Task<IEnumerable<Video>> GetAllVideosAsync(int page, int fetch);
        Task<Video?> GetVideoByIdAsync(Guid id);
    }
}
