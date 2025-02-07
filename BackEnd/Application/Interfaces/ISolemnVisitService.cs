using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.SlideImage.Output;
using Application.DTOs.SolemnVisit.Output;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface ISolemnVisitService
    {
        Task<IEnumerable<GetSolemnVisitResponse>> GetAllSolemnVisitsAsync();
        Task<GetSolemnVisitResponse?> GetSolemnVisitByIdAsync(Guid id);
    }
}
