using Domain;
using Infrastructure.Persistence;

namespace Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DatabaseManager _context;
        public UnitOfWork(DatabaseManager context) 
        {
            _context = context;
        }

        public async Task<IUnitOfWork> BeginTransactionAsync()
        {
            await _context.Database.BeginTransactionAsync();
            return this;
        }

        public async Task CommitTransactionAsync()
        {
            await _context.Database.CommitTransactionAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task RollbackTransactionAsync()
        {
            await _context.Database.RollbackTransactionAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task TrackEntity<TEntity>(TEntity entity) where TEntity : class
        {
            _context.Attach(entity);
            await Task.CompletedTask;
        }
    }
}
