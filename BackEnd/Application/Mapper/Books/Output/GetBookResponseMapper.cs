using Domain.Entities;

namespace Application.Mapper.Books.Output
{
    public class GetBookResponseMapper
    {
        public static GetBookResponse GetBookMapEntityToDTO(Book book)
        {
            return new GetBookResponse
            {
                BookId = book.BookId,
                Title = book.Title,
                BookContent = book.BookContent,
                Publisher = book.Publisher,
                Author = book.Author,
                YearPublic = book.YearPublic,
                Image = book.Image,
                CreateDate = book.CreateDate,
                UserId = book.UserId,
                Name = book.User.Name,
                Email = book.User.Email,
                UserName = book.User.Account.UserName,
                RoleName = book.User.Account.Role.RoleName
            };
        }

        public static IEnumerable<GetBookResponse> GetBookListMapEntityToDTO(IEnumerable<Book> books)
        {
            List<GetBookResponse> bookListDTO = [];
            foreach (var book in books)
            {
                bookListDTO.Add(new GetBookResponse
                {
                    BookId = book.BookId,
                    Title = book.Title,
                    BookContent = book.BookContent,
                    Publisher = book.Publisher,
                    Author = book.Author,
                    YearPublic = book.YearPublic,
                    Image = book.Image,
                    CreateDate = book.CreateDate,
                    UserId = book.UserId,
                    Name = book.User.Name,
                    Email = book.User.Email,
                    UserName = book.User.Account.UserName,
                    RoleName = book.User.Account.Role.RoleName
                });
            }
            return bookListDTO;
        }
    }
}
