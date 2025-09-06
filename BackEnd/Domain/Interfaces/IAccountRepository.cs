using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account> GetAccountWithUserAsync(string username);
        Task<Account> GetAccountByIdAsync(Guid accountId);
        Task SaveRefreshTokenAsync(Guid accountId, string refreshToken, DateTime refreshTokenExpiry);
        Task<Account?> GetRefreshTokenAsync(string refreshToken);
    }
}