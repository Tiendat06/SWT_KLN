using Infrastructure.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using KLN.Shared.CrossCuttingConcerns.Enums;

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
    }

}
