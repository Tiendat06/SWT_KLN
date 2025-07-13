using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface IBookService
    {
        Task<PaginationResponseDto<GetBookResponse>> GetAllBooksAsync(GetAllBookRequest input);
        Task<GetBookResponse> GetBookByIdAsync(Guid id);
        Task<GetBookResponse> CreateBookAsync(AddBookRequest addBookRequest);
        Task<bool> DeleteMultipleBooksAsync(List<Guid> ids);
        Task<GetBookResponse> UpdateBookAsync(Guid id, UpdateBookRequest updateBookRequest);
        //Task<int> CountBooksAsync();
    }
}
