using Application.Interfaces;
using Domain.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public class AccountValidator : IAccountValidator
    {
        private readonly IStringLocalizer<KLNSharedResources> _localizer;
        public AccountValidator(IAccountService accountService, IStringLocalizer<KLNSharedResources> localizer)
        {
            _accountService = accountService;
            _localizer = localizer;
        }
        private readonly IAccountService _accountService;
        public AccountValidator(IAccountService accountService)
        {
            _accountService = accountService;
        }
        public async Task<GetLoginReqponse> LoginAsyncValidator(LoginRequest loginRequest)
        {
            var validator = new LoginRequestValidator(_localizer);
            var result = await validator.ValidateAsync(loginRequest);
            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault();
                throw new ArgumentException(error + "");
            }
            return await _accountService.LoginAsync(loginRequest);
        }
    }
}
