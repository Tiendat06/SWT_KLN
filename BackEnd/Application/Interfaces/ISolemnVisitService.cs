using KLN.Shared.CrossCuttingConcerns;
namespace Application.Interfaces
{
    public interface ISolemnVisitService
    {
        Task<PaginationResponseDto<GetSolemnVisitResponse>> GetAllSolemnVisitsAsync(GetSolemnVisitRequest input);
        Task<GetSolemnVisitResponse?> GetSolemnVisitByIdAsync(Guid id);
        Task<GetSolemnVisitResponse> CreateSolemnVisitAsync(AddSolemnVisitRequest addSolemnVisitRequest);
        Task<GetSolemnVisitResponse> UpdateSolemnVisitAsync(Guid id, UpdateSolemnVisitRequest updateSolemnVisitRequest);
    }
}
