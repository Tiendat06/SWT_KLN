using API.Controller.Base;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogBookController : KLNBaseController
    {
        private readonly ILogBookService _logBookService;

        public LogBookController(ILogBookService logBookService)
        {
            _logBookService = logBookService;
        }

        // GET: api/LogBook
        //[HttpGet]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<LogBook>))]
        //public async Task<IActionResult> GetLogBooks()
        //{
            //var logBooks = await _logBookService.GetAllLogBooksAsync();
            //return Ok(new { status = true, data = logBooks, msg = "Load log books successfully" });
        //}

        // GET: api/LogBook/5
        //[HttpGet("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LogBook))]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> GetLogBook(int id)
        //{
            //var logBook = await _logBookService.GetLogBookByIdAsync(id);
            //if (logBook == null)
            //{
            //    return NotFound(new { status = false, msg = "Log book not found" });
            //}
            //return Ok(new { status = true, data = logBook, msg = "Load log book successfully" });
        //}

        // GET: api/LogBook/book/{bookId}
        //[HttpGet("book/{bookId}")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LogBook))]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> GetLogBookByBookId(string bookId)
        //{
            //var logBook = await _logBookService.GetLogBookByBookIdAsync(bookId);
            //if (logBook == null)
            //{
            //    return NotFound(new { status = false, msg = "Log book not found for the specified bookId" });
            //}
            //return Ok(new { status = true, data = logBook, msg = "Load log book successfully" });
        //}

        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LogBook))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public IActionResult CreateLog(/*LogBook logBook*/)
        //{
            //var result = _logBookService.CreateLogBookAsync(logBook);
            //if (result == null)
            //{
            //    return BadRequest(new { status = false, msg = "Log book can not created" });
            //}
            //return Ok(new
            //{
            //    status = true,
            //    data = logBook,
            //    msg = "Log created successfully",
            //});
        //}
        //[HttpDelete("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> DeleteLogBook(int id)
        //{
            //var result = await _logBookService.DeleteLogBookAsync(id);
            //if (!result)
            //{
            //    return NotFound(new { status = false, msg = "Log book not found" });
            //}
            //return Ok(new { status = true, msg = "Log book deleted successfully" });
        //}

    }
}
