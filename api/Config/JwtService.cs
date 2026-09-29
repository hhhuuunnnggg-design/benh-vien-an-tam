using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Config.Type;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace api.Config;

public sealed class JwtService(IOptions<JwtOptions> options)
{
    private readonly JwtOptions _options = options.Value;

    public string CreateToken(AuthTokenPayload payload)
    {
        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey)),
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims:
            [
                new Claim("uuid", payload.Uuid.ToString()),
                new Claim("email", payload.Email),
                new Claim(
                    JwtRegisteredClaimNames.Iat,
                    payload.TimeDate.Iat.ToString(),
                    ClaimValueTypes.Integer64)
            ],
            expires: DateTimeOffset.FromUnixTimeSeconds(payload.TimeDate.Exp).UtcDateTime,
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
