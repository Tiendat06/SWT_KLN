using Application.DTOs.Book.Input;
using Application.DTOs.Book.Output;
using Application.Interfaces;
using Domain.Localization;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;

namespace Application.Validators
{
    public class BookValidator : IBookValidator
    {
        private readonly IBookService _bookService;
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public BookValidator(IBookService bookService, IStringLocalizer<KLNSharedResources> localizer) 
        {
            _bookService = bookService;
            _localizer = localizer;
        }

        public async Task<GetBookResponse> CreateBookAsyncValidator(AddBookRequest addBookRequest)
        {
            var validator = new AddBookRequestValidator(_localizer);
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
            var validator = new UpdateBookRequestValidator(_localizer);
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
