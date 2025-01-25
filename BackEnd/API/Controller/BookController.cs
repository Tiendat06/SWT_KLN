using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using API.Controller.Base;
using Application.DTOs.Book.Output;
using Application.DTOs.Site.Output;
using Application.DTOs.Book.Input;
using Application.Validators;
using System.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : KLNBaseController
    {
        private readonly IBookService _bookService;
        private readonly ILogBookService _logBookService;
        private readonly BookValidator _bookValidator;

        public BookController(IBookService bookService, ILogBookService logBookService, BookValidator bookValidator)
        {
            _bookService = bookService;
            _logBookService = logBookService;
            _bookValidator = bookValidator;
        }

        // GET: api/Book
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<IEnumerable<GetBookResponse>>))]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return ApiSuccess(books);
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetBookResponse>))]
        public async Task<IActionResult> GetBookById(Guid id)
        {
            var book = await _bookService.GetBookByIdAsync(id);

            return ApiSuccess(book);
        }

        // POST: api/Book
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CustomResponse<GetBookResponse>))]
        public async Task<IActionResult> PostBook([FromForm] AddBookRequest addBookRequest)
        {
            var book = await _bookValidator.CreateBookAsyncValidator(addBookRequest);
            return ApiSuccess(book, HttpStatusCode.Created);
        }

        // PUT: api/Book/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomResponse<GetBookResponse>))]
        public async Task<IActionResult> PutBook(Guid id, [FromForm] UpdateBookRequest updateBookRequest)
        {
            var book = await _bookValidator.UpdateBookAsyncValidator(id, updateBookRequest);
            return ApiSuccess(book);
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            var isDeleted = await _bookService.DeleteBookAsync(id);
            return ApiSuccess();
        }
    }
}

