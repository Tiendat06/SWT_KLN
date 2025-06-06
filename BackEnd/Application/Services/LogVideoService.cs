using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogVideoService(
        ILogVideoRepository _logVideoRepository,
        IUnitOfWork _unitOfWork
        ) : ILogVideoService
    {
    }
}