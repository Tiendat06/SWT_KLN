using Domain.Entities;
using KLN.Shared.CrossCuttingConcerns;

namespace Application.Interfaces
{
    public interface IAccountService
    {
        Task<GetLoginReqponse> LoginAsync(LoginRequest loginRequest);
    }
}