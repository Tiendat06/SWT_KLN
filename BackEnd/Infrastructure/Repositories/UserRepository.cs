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

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _databaseManager.Users
                .AsNoTracking()
                .Include(s => s.Account)
                .ThenInclude(s => s.Role)
                .ToListAsync();
        }
    }
}
