using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns.Enums;

namespace Infrastructure.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly DatabaseManager _context;

        public BookRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task CreateBookAsync(Book book)
        {
            await _context.Books.AddAsync(book);
        }

        public async Task<IEnumerable<Book>> GetAllBooksAsync(int page, int fetch, int type)
        {
            var query = _context.Books
                .AsNoTracking()
                .Where(book => book.IsDeleted == false);

            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);

            // Sắp xếp trước khi phân trang
            query = query.OrderByDescending(book => book.CreateDate);

            // Phân trang nếu fetch > 0, ngược lại lấy tất cả
            if (fetch > 0)
            {
                int skip = (page - 1) * fetch;
                query = query.Skip(skip).Take(fetch);
            }
            return await query
                .Include(book => book.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .ToListAsync();
        }

        public async Task<Book?> GetBookByIdAsync(Guid id)
        {
            return await _context.Books
                .AsNoTracking()
                .Include(book => book.User)
                .ThenInclude(user => user.Account)
                .ThenInclude(account => account.Role)
                .FirstOrDefaultAsync(book => book.BookId == id && book.IsDeleted == false);
        }

        public async Task HardDeleteBookAsync(Guid id)
        {
            _context.Books.Remove(new Book { BookId = id });
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteBookAsync(Book book)
        {
            book.IsDeleted = true;
            await Task.CompletedTask;
        }

        public async Task<int> CountBooksAsync(int type)
        {
            var query = _context.Books
                .AsNoTracking();
            if (type > (int)MediaTypeEnum.None)
                query = query.Where(x => x.MediaTypeId == type);
            return await query.CountAsync(x => x.IsDeleted == false);
        }
    }
}
