using KLN.Models;
using KLN.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KLN.Services
{
    public class LogBookService
    {
        private readonly LogBookRepository _LogBookRepository;

        public LogBookService(LogBookRepository LogBookRepository)
        {
            _LogBookRepository = LogBookRepository;
        }

        public async Task<List<LogBook>> GetAllLogBooksAsync()
        {
            return await _LogBookRepository.GetAllLogBooksAsync();
        }

        public async Task<LogBook> GetLogBookByIdAsync(int id)
        {
            return await _LogBookRepository.GetLogBookByIdAsync(id);
        }

        public async Task<List<LogBook>> GetLogBookByBookIdAsync(string id)
        {
            return await _LogBookRepository.GetLogBookByBookIdAsync(id);
        }

        public async Task<LogBook> CreateLogBookAsync(LogBook LogBook)
        {
            return await _LogBookRepository.CreateLogBookAsync(LogBook);
        }

        public async Task<bool> DeleteLogBookAsync(int id)
        {
            return await _LogBookRepository.DeleteLogBookAsync(id);
        }

        public async Task<LogBook> LogBookActionAsync(Book book, string process, string flag)
        {
            var log = new LogBook
            {
                logBookId = 0,
                bookId = book.bookId,
                title = book.title,
                bookContent = book.bookContent,
                publisher = book.publisher,
                author = book.author,
                yearPublic = book.yearPublic,
                createDate = book.createDate,
                image = book.image,
                userId = book.userId,
                process = process,
                updateDate = DateTime.Now,
                flag = flag
            };
            return await CreateLogBookAsync(log);
        }
    }
}
