using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ILogBookRepository
    {
        Task<IEnumerable<LogBook>> GetAllLogBooksAsync();
        Task<LogBook?> GetLogBookByIdAsync(int id);
        Task<IEnumerable<LogBook>> GetLogBooksByBookIdAsync(int bookId);
        Task CreateLogBookAsync(LogBook logBook);
        Task CreateLogBookRangeAsync(IEnumerable<LogBook> logBooks);
        Task HardDeleteLogBookAsync(int id);
        Task SoftDeleteLogBookAsync(LogBook logBook);
    }
}
