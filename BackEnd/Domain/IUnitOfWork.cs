namespace Domain
{
    public interface IUnitOfWork : IDisposable
    {
        Task SaveChangesAsync();
        Task<IUnitOfWork> BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
        Task TrackEntity<TEntity>(TEntity entity) where TEntity : class;
    }
}
