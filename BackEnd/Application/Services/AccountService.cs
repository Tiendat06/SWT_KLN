using Application.Interfaces;
using Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IConfiguration _config;

        public AccountService(IAccountRepository accountRepository, IConfiguration config)
        {
            _accountRepository = accountRepository;
            _config = config;
        }

        public async Task<GetLoginResponse> LoginAsync(LoginRequest loginRequest)
        {
            try
            {
                var account = await _accountRepository.GetAccountWithUserAsync(loginRequest.Username);

                if (account == null)
                    throw new ArgumentException("Wrong username or password");

                // Verify password
                if (account.Password != loginRequest.Password)
                    throw new ArgumentException("Wrong username or password");

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_config["JWT_KEY_SECRET"]);

                // Generate access token (JWT)
                var claims = new[]
                {
                    new Claim("accountId", account.AccountId.ToString()),
                    new Claim(ClaimTypes.Name, account.UserName),
                    new Claim(ClaimTypes.Role, MapRole((int)account.RoleId)),
                    new Claim(JwtRegisteredClaimNames.Email, account.User.Email ?? ""),
                    new Claim("userId", account.User.UserId.ToString())
                };

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(int.Parse(_config["JWT_EXPIRE_HOURS"] ?? "1")), // 1 hour default
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);

                // Generate refresh token separately
                var refreshToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                var refreshTokenExpiry = DateTime.UtcNow.AddDays(7);

                // Store refresh token in DB for validation/revocation
                await _accountRepository.SaveRefreshTokenAsync(account.AccountId, refreshToken, refreshTokenExpiry);

                return new GetLoginResponse
                {
                    AccountId = account.AccountId,
                    Token = tokenHandler.WriteToken(token),
                    Username = account.UserName,
                    Email = account.User.Email,
                    RoleName = MapRole((int)account.RoleId),
                    RefreshToken = refreshToken,
                    RefreshTokenExpiry = refreshTokenExpiry,
                    roleId = account.RoleId
                };
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }

        private string MapRole(int roleId)
        {
            return roleId switch
            {
                1 => "Admin",
                2 => "User",
                _ => "Guest"
            };
        }

        public async Task<GetLoginResponse> RefreshTokenAsync(string refreshToken)
        {
            var userAccount = await _accountRepository.GetRefreshTokenAsync(refreshToken);
            var storedToken = userAccount.RefreshToken;
            if (storedToken == null || userAccount.RefreshTokenExpiry < DateTime.UtcNow)
                throw new ArgumentException("Invalid or expired refresh token");

            var account = await _accountRepository.GetAccountByIdAsync(userAccount.AccountId);
            if (account == null)
                throw new ArgumentException("User not found");

            // Issue new access token
            return await LoginAsync(new LoginRequest
            {
                Username = account.UserName,
                Password = account.Password
            });
        }

    }
}