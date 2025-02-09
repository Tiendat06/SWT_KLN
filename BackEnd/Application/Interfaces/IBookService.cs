using Application.DTOs.Book.Input;
using Application.DTOs.Book.Output;

namespace Application.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<GetBookResponse>> GetAllBooksAsync();
        Task<GetBookResponse> GetBookByIdAsync(Guid id);
        Task<GetBookResponse> CreateBookAsync(AddBookRequest addBookRequest);
        Task<bool> DeleteBookAsync(Guid id);
        Task<GetBookResponse> UpdateBookAsync(Guid id, UpdateBookRequest updateBookRequest);
    }
}
