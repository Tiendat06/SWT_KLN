namespace Application.Validators
{
    public interface ISolemnVisitValidator
    {
        Task<GetSolemnVisitResponse> CreateSolemnVisitAsyncValidator(AddSolemnVisitRequest addSolemnVisitRequest);
    }
}
