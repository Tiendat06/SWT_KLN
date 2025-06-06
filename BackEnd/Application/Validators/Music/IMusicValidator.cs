namespace Application.Validators
{
    public interface IMusicValidator
    {
        Task<GetMusicResponse> CreateMusicAsyncValidator(AddMusicRequest addMusicRequest);
        Task<GetMusicResponse> UpdateMusicAsyncValidator(Guid id, UpdateMusicRequest updateMusicRequest);
    }
}
