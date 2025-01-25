using Application.Interfaces;
using Domain;
using Domain.Entities;
using Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class LogBookService : ILogBookService
    {
        private readonly ILogBookRepository _logBookRepository;
        private readonly IUnitOfWork _unitOfWork;

        public LogBookService(ILogBookRepository logBookRepository, IUnitOfWork unitOfWork)
        {
            _logBookRepository = logBookRepository;
            _unitOfWork = unitOfWork;
        }

        //public async Task<List<LogBook>> GetAllLogBooksAsync()
        //{
        //    return await _LogBookRepository.GetAllLogBooksAsync();
        //}

        //public async Task<LogBook> GetLogBookByIdAsync(int id)
        //{
        //    return await _LogBookRepository.GetLogBookByIdAsync(id);
        //}

        //public async Task<List<LogBook>> GetLogBookByBookIdAsync(string id)
        //{
        //    return await _LogBookRepository.GetLogBookByBookIdAsync(id);
        //}

        //public async Task<LogBook> CreateLogBookAsync(LogBook LogBook)
        //{
        //    return await _LogBookRepository.CreateLogBookAsync(LogBook);
        //}

        //public async Task<bool> DeleteLogBookAsync(int id)
        //{
        //    return await _LogBookRepository.DeleteLogBookAsync(id);
        //}

        //public async Task<LogBook> LogBookActionAsync(Book book, string process, string flag)
        //{
        //    var log = new LogBook
        //    {
        //        LogBookId = 0,
        //        BookId = book.BookId,
        //        Title = book.Title,
        //        BookContent = book.BookContent,
        //        Publisher = book.Publisher,
        //        Author = book.Author,
        //        YearPublic = book.YearPublic,
        //        CreateDate = book.CreateDate,
        //        Image = book.Image,
        //        UserId = book.UserId,
        //        Process = process,
        //        UpdateDate = DateTime.Now,
        //        Flag = flag
        //    };
        //    return await CreateLogBookAsync(log);
        //}
    }
}
