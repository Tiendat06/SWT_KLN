using Application.Interfaces;
using Domain;
using Domain.Interfaces;

namespace Application.Services
{
    public class LogBlogService(
        ILogBlogRepository _logBlogRepository,
        IUnitOfWork _unitOfWork
        ) : ILogBlogService
    {

    }
}
