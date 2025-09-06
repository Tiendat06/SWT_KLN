namespace Application.Validators
{
    public interface IAccountValidator
    {
        public Task<GetLoginResponse> LoginAsyncValidator(LoginRequest loginRequest);
    }
}
