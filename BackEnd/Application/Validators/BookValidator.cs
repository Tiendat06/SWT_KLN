using Application.DTOs.Book.Input;
using Application.DTOs.Book.Output;
using Application.Interfaces;
using FluentValidation.Results;

namespace Application.Validators
{
    public class BookValidator
    {
        private readonly IBookService _bookService;
        public BookValidator(IBookService bookService) 
        {
            _bookService = bookService;
        }

        public async Task<GetBookResponse> CreateBookAsyncValidator(AddBookRequest addBookRequest)
        {
            var validator = new AddBookRequestValidator();
            ValidationResult result = await validator.ValidateAsync(addBookRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _bookService.CreateBookAsync(addBookRequest);
        }

        public async Task<GetBookResponse> UpdateBookAsyncValidator(Guid id, UpdateBookRequest updateBookRequest)
        {
            var validator = new UpdateBookRequestValidator();
            ValidationResult result = await validator.ValidateAsync(updateBookRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _bookService.UpdateBookAsync(id, updateBookRequest);
        }
    }
}
