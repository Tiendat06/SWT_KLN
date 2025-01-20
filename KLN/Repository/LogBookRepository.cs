using KLN.Config;
using KLN.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KLN.Repository
{
    public class LogBookRepository
    {
        private readonly DatabaseManager _context;

        public LogBookRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task<List<LogBook>> GetAllLogBooksAsync()
        {
            var result = await _context.LogBooks.ToListAsync();
            if (result == null || !result.Any())
            {
                return null;
            }
            return result;
        }

        public async Task<LogBook> GetLogBookByIdAsync(int id)
        {
            return await _context.LogBooks.FindAsync(id);
        }

        public async Task<List<LogBook>> GetLogBookByBookIdAsync(string bookId)
        {
            var result = await _context.LogBooks.Where(lb => lb.bookId == bookId).ToListAsync();
            if (result == null || !result.Any())
            {
                return null;
            }
            return result;
        }

        public async Task<LogBook> CreateLogBookAsync(LogBook LogBook)
        {
            _context.LogBooks.Add(LogBook);
            try
            {
                await _context.SaveChangesAsync();
                return LogBook;
            }
            catch (DbUpdateException)
            {
                return null;
            }
        }

        public async Task<bool> DeleteLogBookAsync(int id)
        {
            var LogBook = await _context.LogBooks.FindAsync(id);
            if (LogBook == null)
            {
                return false;
            }

            _context.LogBooks.Remove(LogBook);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
