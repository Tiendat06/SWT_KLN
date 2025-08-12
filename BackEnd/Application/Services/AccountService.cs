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

        public async Task<GetLoginReqponse> LoginAsync(LoginRequest loginRequest)
        {
            try
            {
                var account = await _accountRepository.GetAccountWithUserAsync(loginRequest.Username);

                if (account == null)
                    return null;

                //// Verify hashed password
                //if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, account.Password))
                //    return null;

                // Plain password check
                if (account.Password != loginRequest.Password)
                    throw new ArgumentException("Wrong username or password");

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_config["JWT_KEY_SECRET"]);

                var refreshToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                var refreshTokenExpiry = DateTime.UtcNow.AddDays(7);

                var claims = new[]
                {
                    new Claim("accountId", account.AccountId.ToString()),
                    new Claim(ClaimTypes.Name, account.UserName),
                    new Claim(ClaimTypes.Role, MapRole((int)account.RoleId)),
                    new Claim(JwtRegisteredClaimNames.Email, account.User.Email ?? ""),
                    new Claim("userId", account.User.UserId.ToString()),
                    new Claim("refreshToken", refreshToken),
                    new Claim("refreshTokenExpiry", refreshTokenExpiry.ToString("o"))
                };

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(int.Parse(_config["JWT_EXPIRE_HOURS"] ?? "1")),
                    //Issuer = _config["JWT_ISSUER"],
                    //Audience = _config["JWT_AUDIENCE"],
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);

                return new GetLoginReqponse
                {
                    AccountId = account.AccountId,
                    Token = tokenHandler.WriteToken(token),
                    Username = account.UserName,
                    Email = account.User.Email,
                    RoleName = MapRole((int)account.RoleId),
                    RefreshToken = refreshToken
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

        public async Task<GetLoginReqponse> RefreshTokenAsync(string expiredAccessToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["JWT_KEY_SECRET"]);

            // Read expired token
            var principal = tokenHandler.ValidateToken(expiredAccessToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false // ignore expiry
            }, out SecurityToken validatedToken);

            // Extract refresh token & expiry
            var refreshToken = principal.Claims.FirstOrDefault(c => c.Type == "refreshToken")?.Value;
            var refreshTokenExpiryStr = principal.Claims.FirstOrDefault(c => c.Type == "refreshTokenExpiry")?.Value;

            if (string.IsNullOrEmpty(refreshToken) || string.IsNullOrEmpty(refreshTokenExpiryStr))
                throw new SecurityTokenException("Refresh token missing");

            if (!DateTime.TryParse(refreshTokenExpiryStr, out var refreshTokenExpiry) || refreshTokenExpiry < DateTime.UtcNow)
                throw new SecurityTokenException("Refresh token expired");

            // Get account
            var accountId = principal.Claims.FirstOrDefault(c => c.Type == "accountId")?.Value;
            var account = await _accountRepository.GetAccountByIdAsync(Guid.Parse(accountId));
            if (account == null)
                throw new SecurityTokenException("Invalid account");

            // Create new access token with same refresh token info
            var claims = new[]
            {
                new Claim("accountId", account.AccountId.ToString()),
                new Claim(ClaimTypes.Name, account.UserName),
                new Claim(ClaimTypes.Role, MapRole((int)account.RoleId)),
                new Claim(JwtRegisteredClaimNames.Email, account.User.Email ?? ""),
                new Claim("userId", account.User.UserId.ToString()),
                new Claim("refreshToken", refreshToken),
                new Claim("refreshTokenExpiry", refreshTokenExpiry.ToString("o"))
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // New access token: 1 hour
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var newToken = tokenHandler.CreateToken(tokenDescriptor);

            return new GetLoginReqponse
            {
                AccountId = account.AccountId,
                Token = tokenHandler.WriteToken(newToken),
                RefreshToken = refreshToken, // Same refresh token until it expires
                Username = account.UserName,
                Email = account.User.Email,
                RoleName = MapRole((int)account.RoleId)
            };
        }
    }
}