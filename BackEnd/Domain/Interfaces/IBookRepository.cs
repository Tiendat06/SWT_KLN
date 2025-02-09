using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooksAsync();
        Task<Book?> GetBookByIdAsync(Guid id);
        Task CreateBookAsync(Book book);
        Task HardDeleteBookAsync(Guid id);
        Task SoftDeleteBookAsync(Book book);
    }
}
