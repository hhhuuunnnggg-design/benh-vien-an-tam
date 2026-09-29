using api.Contract.Auth;
using api.Service;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(AuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request, CancellationToken cancellationToken)
    {
        var result = await authService.RegisterAsync(request, cancellationToken);

        if (result.IsConflict)
        {
            return Conflict(new { message = "So dien thoai hoac email da duoc su dung." });
        }

        if (result.Errors.Count > 0)
        {
            foreach (var (field, errors) in result.Errors)
            {
                foreach (var error in errors)
                {
                    ModelState.AddModelError(field, error);
                }
            }

            return ValidationProblem(ModelState);
        }

        return StatusCode(StatusCodes.Status201Created, new
        {
            message = "Tao tai khoan thanh cong.",
            uuid = result.AccountUuid,
            patientProfileUuid = result.PatientProfileUuid,
            email = result.Email
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await authService.LoginAsync(request, cancellationToken);
        if (result is null)
        {
            return Unauthorized(new { message = "So dien thoai hoac mat khau khong dung." });
        }

        AppendTokenCookie("access_token", result.AccessToken, result.AccessExpiresAt);
        AppendTokenCookie("refresh_token", result.RefreshToken, result.RefreshExpiresAt);

        return Ok(new
        {
            message = "Dang nhap thanh cong.",
            uuid = result.Uuid,
            email = result.Email,
            timeDate = new
            {
                iat = result.IssuedAt.ToUnixTimeSeconds(),
                exp = result.AccessExpiresAt.ToUnixTimeSeconds()
            }
        });
    }

    private void AppendTokenCookie(string name, string value, DateTimeOffset expiresAt)
    {
        Response.Cookies.Append(name, value, new CookieOptions
        {
            HttpOnly = true,
            Secure = Request.IsHttps,
            SameSite = SameSiteMode.Strict,
            Expires = expiresAt,
            Path = "/"
        });
    }
}
