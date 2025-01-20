using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseManager _databaseManager;
        public UserRepository(DatabaseManager databaseManager) 
        {
            _databaseManager = databaseManager;
        }

        public async Task<List<User>> getAllUsersAsync()
        {
            return await _databaseManager.Users
                .AsNoTracking()
                .Include(s => s.account)
                .ThenInclude(s => s.role)
                .ToListAsync();
        }
    }
}
