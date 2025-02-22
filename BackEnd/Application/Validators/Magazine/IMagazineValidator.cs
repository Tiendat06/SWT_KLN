
namespace Application.Validators
{
    public interface IMagazineValidator
    {
        Task<GetMagazineResponse> CreateMagazineAsyncValidator(AddMagazineRequest addMagazineRequest);
        Task<GetMagazineResponse> UpdateMagazineAsyncValidator(Guid id, UpdateMagazineRequest updateMagazineRequest);
    }
}
