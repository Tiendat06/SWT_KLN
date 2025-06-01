using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogBookService(
        ILogBookRepository _logBookRepository,
        IUnitOfWork _unitOfWork
        ) : ILogBookService
    {

    }
}
