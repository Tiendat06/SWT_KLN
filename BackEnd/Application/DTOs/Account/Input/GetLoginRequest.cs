using Application;
using Application.DTOs;
using Application.Extension;
using Domain.Localization;
using FluentValidation;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application 
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class GetLoginResponse
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public Guid AccountId { get; set; }
        public int? roleId { get; set; }
        public string Token { get; set; }
        public string RoleName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public string? PasswordResetToken { get; set; }
    }

    public class GetUserRoleResponse
    {
        public Guid AccountId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator(IStringLocalizer<KLNSharedResources> localizer)
    {
        RuleFor(x => x.Username).NotNull().MaximumLength(50).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["Username"]));
        RuleFor(x => x.Password).NotNull().MaximumLength(50).WithMessage(CommonExtensions.GetValidateMessage(localizer["NotEmpty"], localizer["Password"]));
    }
}