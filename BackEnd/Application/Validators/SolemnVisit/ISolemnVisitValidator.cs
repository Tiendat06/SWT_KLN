namespace Application.Validators
{
    public interface ISolemnVisitValidator
    {
        Task<GetSolemnVisitResponse> CreateSolemnVisitAsyncValidator(AddSolemnVisitRequest addSolemnVisitRequest);
        Task<GetSolemnVisitResponse> UpdateSolemnVisitAsyncValidator(Guid id, UpdateSolemnVisitRequest addSolemnVisitRequest);
    }
}
