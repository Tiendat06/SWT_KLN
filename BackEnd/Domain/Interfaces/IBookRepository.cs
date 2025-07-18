using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooksAsync(int page, int fetch, int type);
        Task<Book?> GetBookByIdAsync(Guid id);
        Task <List<Book>> GetBookByIdsAsync(List<Guid> ids);
        Task CreateBookAsync(Book book);
        Task HardDeleteBookAsync(Guid id);
        Task SoftDeleteMultipleBookAsync(List<Guid> ids);
        Task<int> CountBooksAsync(int type);
        Task<Book?> GetBookByTitleAsync(string title);
    }
}
