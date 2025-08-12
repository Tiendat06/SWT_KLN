using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account> GetAccountWithUserAsync(string username);
        Task<Account> GetAccountByIdAsync(Guid accountId);
    }
}