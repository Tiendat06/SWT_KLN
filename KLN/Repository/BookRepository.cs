using KLN.Config;
using KLN.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KLN.Repository
{
    public class BookRepository
    {
        private readonly DatabaseManager _context;

        public BookRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task<List<Book>> GetAllBooksAsync()
        {
            var result = await _context.Books.ToListAsync();
            if (result == null || !result.Any())
            {
                return null;
            }
            return result;
        }

        public async Task<Book> GetBookByIdAsync(string id)
        {
            return await _context.Books.FindAsync(id);
        }

        public async Task<bool> UpdateBookAsync(Book book)
        {
            var existingBook = await _context.Books.FindAsync(book.bookId);
            if (existingBook == null)
            {
                return false;
            }
            existingBook.title = book.title;
            existingBook.bookContent = book.bookContent;
            existingBook.author = book.author;
            existingBook.publisher = book.publisher;
            existingBook.yearPublic = book.yearPublic;
            existingBook.createDate = book.createDate;
            existingBook.image = book.image;
            existingBook.userId = book.userId;
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }

        public async Task<Book> CreateBookAsync(Book book)
        {
            _context.Books.Add(book);
            try
            {
                await _context.SaveChangesAsync();
                return book;
            }
            catch (DbUpdateException)
            {

                return null;

            }
        }

        public async Task<Book> DeleteBookAsync(string id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return null;
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return book;
        }

    }
}
