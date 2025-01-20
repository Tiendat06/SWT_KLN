using KLN.Models;
using KLN.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KLN.Services
{
    public class BookService
    {
        private readonly BookRepository _bookRepository;

        public BookService(BookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<List<Book>> GetAllBooksAsync()
        {
            return await _bookRepository.GetAllBooksAsync();
        }

        public async Task<Book> GetBookByIdAsync(string id)
        {
            return await _bookRepository.GetBookByIdAsync(id);
        }

        public async Task<bool> UpdateBookAsync(string id, Book book)
        {
            return await _bookRepository.UpdateBookAsync(book);
        }

        public async Task<Book> CreateBookAsync(Book book)
        {
            return await _bookRepository.CreateBookAsync(book);
        }

        public async Task<Book> DeleteBookAsync(string id)
        {
            return await _bookRepository.DeleteBookAsync(id);
        }
    }
}
