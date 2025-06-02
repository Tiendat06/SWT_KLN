using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogMagazineService(
        ILogMagazineRepository _logMagazineRepository,
        IUnitOfWork _unitOfWork
        ) : ILogMagazineService
    {
        
    }
}