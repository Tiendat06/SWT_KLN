using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns.Enums;

namespace Infrastructure.Repositories
{
    public class LogSolemnVisitRepository : ILogSolemnVisitRepository
    {
        private readonly DatabaseManager _context;
        public LogSolemnVisitRepository(DatabaseManager context)
        {
            _context = context;
        }
        public async Task CreateLogSolemnVisitAsync(LogSolemnVisit log)
        {
            await _context.LogSolemVisits.AddAsync(log);
        }
    }
}
