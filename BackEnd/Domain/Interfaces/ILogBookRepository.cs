using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ILogBookRepository
    {
        Task<IEnumerable<LogBook>> GetAllLogBooksAsync();
        Task<LogBook?> GetLogBookByIdAsync(int id);
        Task<IEnumerable<LogBook>> GetLogBooksByBookIdAsync(int bookId);
        Task CreateLogBookAsync(LogBook logBook);
        Task HardDeleteLogBookAsync(int id);
        Task SoftDeleteLogBookAsync(LogBook logBook);
    }
}
