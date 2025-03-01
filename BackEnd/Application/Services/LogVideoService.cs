using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogVideoService : ILogVideoService
    {
        private readonly ILogVideoRepository _logVideoRepository;
        private readonly IUnitOfWork _unitOfWork;

        public LogVideoService(ILogVideoRepository logVideoRepository, IUnitOfWork unitOfWork)
        {
            _logVideoRepository = logVideoRepository;
            _unitOfWork = unitOfWork;
        }
    }
}