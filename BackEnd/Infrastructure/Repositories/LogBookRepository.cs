using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class LogBookRepository : ILogBookRepository
    {
        private readonly DatabaseManager _context;

        public LogBookRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateLogBookAsync(LogBook logBook)
        {
            await _context.LogBooks.AddAsync(logBook);
        }

        public async Task<IEnumerable<LogBook>> GetAllLogBooksAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<LogBook?> GetLogBookByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<LogBook>> GetLogBooksByBookIdAsync(int bookId)
        {
            throw new NotImplementedException();
        }

        public async Task HardDeleteLogBookAsync(int id)
        {
            _context.LogBooks.Remove(new LogBook { LogBookId = id });
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteLogBookAsync(LogBook logBook)
        {
            logBook.Flag = true;
            await Task.CompletedTask;
        }
    }
}
