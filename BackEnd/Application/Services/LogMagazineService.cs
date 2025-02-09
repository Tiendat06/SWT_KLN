using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogMagazineService : ILogMagazineService
    {
        private readonly ILogMagazineRepository _logMagazineRepository;
        private readonly IUnitOfWork _unitOfWork;

        public LogMagazineService(ILogMagazineRepository logMagazineRepository, IUnitOfWork unitOfWork)
        {
            _logMagazineRepository = logMagazineRepository;
            _unitOfWork = unitOfWork;
        }
    }
}