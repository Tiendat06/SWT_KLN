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
                Description = addBookRequest.Description,
                Publisher = addBookRequest.Publisher,
                Author = addBookRequest.Author,
                YearPublic = addBookRequest.YearPublic,
                MediaTypeId = addBookRequest.MediaTypeId,
                Image = bookImage,
                UserId = addBookRequest.UserId,
            };
        }
    }
}
