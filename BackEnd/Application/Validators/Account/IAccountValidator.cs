namespace Application.Validators
{
    public interface IAccountValidator
    {
        public Task<GetLoginReqponse> LoginAsyncValidator(LoginRequest loginRequest);
    }
}
