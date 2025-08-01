using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ISolemnVisitRepository
    {
        Task<IEnumerable<SolemnVisit>> GetAllSolemnVisitsAsync(int page, int fetch);
        Task<SolemnVisit?> GetSolemnVisitByIdAsync(Guid id);
        Task<int> CountSolemnVisitAsync();
        Task<SolemnVisit?> GetSolemnVisitByNameAsync(string name);
        Task CreateSolemnVisitAsync(SolemnVisit solemnVisit);
    }
}
