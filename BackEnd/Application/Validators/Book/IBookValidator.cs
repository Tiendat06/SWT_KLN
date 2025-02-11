using Application.DTOs.Book.Input;
using Application.DTOs.Book.Output;

namespace Application.Validators
{
    public interface IBookValidator
    {
        Task<GetBookResponse> CreateBookAsyncValidator(AddBookRequest addBookRequest);
        Task<GetBookResponse> UpdateBookAsyncValidator(Guid id, UpdateBookRequest updateBookRequest);
    }
}
