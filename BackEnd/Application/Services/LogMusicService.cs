using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogMusicService(
        ILogMusicRepository _logMusicRepository,
        IUnitOfWork _unitOfWork
        ) : ILogMusicService
    {
    }
}
