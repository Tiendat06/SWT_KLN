using KLN.Config;
using KLN.Models;
using Microsoft.EntityFrameworkCore;

namespace KLN.Repository
{
    public class UserRepository
    {
        private readonly DatabaseManager _context;
        public UserRepository(DatabaseManager context) 
        {
            _context = context;
        }
        public List<User> getAllUsers()
        {            
            return _context.Users
                .Include(s => s.account)
                .ThenInclude(s => s.role)
                .ToList();
        }
    }
}
