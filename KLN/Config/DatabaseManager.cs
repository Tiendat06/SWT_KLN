using KLN.Models;
using Microsoft.EntityFrameworkCore;

namespace KLN.Config
{
    public class DatabaseManager: DbContext
    {
        public DatabaseManager(DbContextOptions<DatabaseManager> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}
