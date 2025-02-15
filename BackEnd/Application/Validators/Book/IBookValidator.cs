namespace Application.Validators
{
    public interface IBookValidator
    {
        Task<GetBookResponse> CreateBookAsyncValidator(AddBookRequest addBookRequest);
        Task<GetBookResponse> UpdateBookAsyncValidator(Guid id, UpdateBookRequest updateBookRequest);
    }
}
