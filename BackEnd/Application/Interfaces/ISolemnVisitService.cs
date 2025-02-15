
namespace Application.Interfaces
{
    public interface ISolemnVisitService
    {
        Task<IEnumerable<GetSolemnVisitResponse>> GetAllSolemnVisitsAsync(GetSolemnVisitRequest input);
        Task<GetSolemnVisitResponse?> GetSolemnVisitByIdAsync(Guid id);
    }
}
