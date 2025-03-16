
namespace Application.Interfaces
{
    public interface IBookService
    {
        Task<PaginationResponseDto<GetBookResponse>> GetAllBooksAsync(GetAllBookRequest input);
        Task<GetBookResponse> GetBookByIdAsync(Guid id);
        Task<GetBookResponse> CreateBookAsync(AddBookRequest addBookRequest);
        Task<bool> DeleteBookAsync(Guid id);
        Task<GetBookResponse> UpdateBookAsync(Guid id, UpdateBookRequest updateBookRequest);
        //Task<int> CountBooksAsync();
    }
}
