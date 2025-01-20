using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KLN.Config;
using KLN.Models;
using KLN.Services;

namespace KLN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;
        private readonly LogBookService _logBookService;

        public BookController(BookService bookService, LogBookService logBookService)
        {
            _bookService = bookService;
            _logBookService = logBookService;
        }

        // GET: api/Book
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Book>))]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(new { status = true, data = books, msg = "Load books successfully" });
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Book))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetBook(string id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound(new { status = false, msg = "Book not found" });
            }
            return Ok(new { status = true, data = book, msg = "Load book successfully" });
        }

        // PUT: api/Book/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Book))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutBook(string id, Book book)
        {
            if (id != book.bookId)
            {
                return BadRequest(new { status = false, msg = "Book ID mismatch" });
            }

            // Lấy thông tin sách cũ trước khi cập nhật
            var oldBook = await _bookService.GetBookByIdAsync(id);
            if (oldBook == null)
            {
                return NotFound(new { status = false, msg = "Book not found" });
            }

            // Tạo log cho sách cũ
            await _logBookService.LogBookActionAsync(oldBook, "Update", "O");

            // Cập nhật sách
            var result = await _bookService.UpdateBookAsync(id, book);

            if (!result)
            {
                return NotFound(new { status = false, msg = "Book not found" });
            }
            // Tạo log cho sách mới
            await _logBookService.LogBookActionAsync(book, "Update", "N");

            return Ok(new { status = true, data = book, msg = "Update book successfully" });
            }

        // POST: api/Book
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Book))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostBook(Book book)
        {
            var createdBook = await _bookService.CreateBookAsync(book);
            if (createdBook == null)
            {
                return BadRequest(new { status = false, msg = "Error in creating book" });
            }

            var result = await _logBookService.LogBookActionAsync(book, "Create", "N");
            if (result == null)
            {
                return BadRequest(new { status = false, msg = "Error in creating log book" });
            }

            return CreatedAtAction(nameof(GetBook), new { id = book.bookId }, new { status = true, data = createdBook, msg = "Book created successfully" });
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteBook(string id)
        {
            var book = await _bookService.DeleteBookAsync(id);
            if (book == null)
            {
                return NotFound(new { status = false, msg = "Book not found" });
            }

            var log = await _logBookService.LogBookActionAsync(book, "Delete", "N");
            if (log == null)
            {
                return BadRequest(new { status = false, msg = "Error in creating delete log book" });
            }
            return Ok(new { status = true, data = book, msg = "Delete book successfully" });
        }
    }
}

