using Domain.Entities;
using KLN.Shared.CrossCuttingConcerns;

namespace Application.Interfaces
{
    public interface IAccountService
    {
        Task<GetLoginResponse> LoginAsync(LoginRequest loginRequest);
        Task<GetLoginResponse> RefreshTokenAsync(string refreshToken);
    }
}