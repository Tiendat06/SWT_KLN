using Application.DTOs.Book.Input;
using Domain.Entities;

namespace Application.Mapper.Books.Input
{
    public class AddBookRequestMapper
    {
        public static Book AddBookMapDTOToEntity(AddBookRequest addBookRequest, string bookContent, string bookImage, Guid guid)
        {
            return new Book
            {
                BookId = guid,
                Title = addBookRequest.Title,
                BookContent = bookContent,
                Publisher = addBookRequest.Publisher,
                Author = addBookRequest.Author,
                YearPublic = addBookRequest.YearPublic,
                Image = bookImage,
                UserId = addBookRequest.UserId,
            };
        }
    }
}
