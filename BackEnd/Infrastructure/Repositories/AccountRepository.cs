using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns.Enums;
using Application;
using Microsoft.Identity.Client;

namespace Infrastructure.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DatabaseManager _context;

        public AccountRepository(DatabaseManager context)
        {
            _context = context;
        }

        public async Task<Account> GetAccountWithUserAsync(string username)
        {
            return await _context.Accounts
                .Include(a => a.User)
                .FirstOrDefaultAsync(a =>
                    a.UserName == username &&
                    a.IsHidden == false
                );
        }

        public async Task<Account> GetAccountByIdAsync(Guid accountId)
        {
            return await _context.Accounts
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AccountId == accountId);
        }

        public async Task SaveRefreshTokenAsync(Guid accountId, string refreshToken, DateTime refreshTokenExpiry)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountId == accountId);
            if (account != null)
            {
                account.RefreshToken = refreshToken;
                account.RefreshTokenExpiry = refreshTokenExpiry;
                _context.Accounts.Update(account);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Account?> GetRefreshTokenAsync(string refreshToken)
        {
            return await _context.Accounts
            .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.RefreshToken == refreshToken);
        }
    }
}
