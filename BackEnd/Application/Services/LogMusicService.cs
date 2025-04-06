using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogMusicService : ILogMusicService
    {
        private readonly ILogMusicRepository _logMusicRepository;
        private readonly IUnitOfWork _unitOfWork;

        public LogMusicService(ILogMusicRepository logMusicRepository, IUnitOfWork unitOfWork)
        {
            _logMusicRepository = logMusicRepository;
            _unitOfWork = unitOfWork;
        }
    }
}
