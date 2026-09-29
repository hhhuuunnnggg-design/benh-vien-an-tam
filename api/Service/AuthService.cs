using api.Config;
using api.Config.Type;
using api.Contract.Auth;
using api.Lib;
using api.Model;
using api.Model.Enum;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace api.Service;

public sealed class AuthService(
    DBContext dbContext,
    PasswordHasher passwordHasher,
    JwtService jwtService,
    IOptions<JwtOptions> jwtOptions)
{
    private readonly JwtOptions _jwtOptions = jwtOptions.Value;

    public async Task<RegisterResult> RegisterAsync(
        RegisterRequest request,
        CancellationToken cancellationToken)
    {
        var phone = NormalizePhone(request.Phone);
        var email = request.Email.Trim().ToLowerInvariant();
        var errors = new Dictionary<string, string[]>();

        if (await dbContext.Accounts.AnyAsync(account => account.Phone == phone, cancellationToken))
        {
            errors[nameof(request.Phone)] = ["So dien thoai da duoc su dung."];
        }

        if (await dbContext.PatientProfiles.AnyAsync(profile => profile.Email == email, cancellationToken))
        {
            errors[nameof(request.Email)] = ["Email da duoc su dung."];
        }

        if (errors.Count > 0)
        {
            return new RegisterResult(null, null, null, errors, false);
        }

        var now = DateTime.UtcNow;
        var accountUuid = Guid.NewGuid();
        var profileUuid = Guid.NewGuid();
        var account = new Account
        {
            Uuid = accountUuid,
            Phone = phone,
            Password = passwordHasher.Hash(request.Password),
            RoleUuid = AuthConstants.PatientRoleUuid,
            Status = BaseStatus.Active,
            CreatedAt = now,
            UpdatedAt = now
        };
        var profile = new PatientProfile
        {
            Uuid = profileUuid,
            AccountUuid = accountUuid,
            Name = request.Name.Trim(),
            Gender = request.Gender,
            Birthdate = request.Birthdate!.Value.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc),
            MedicalCode = $"BN-{profileUuid:N}"[..13].ToUpperInvariant(),
            Email = email
        };

        await using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);
        dbContext.Accounts.Add(account);
        dbContext.PatientProfiles.Add(profile);

        try
        {
            await dbContext.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
        }
        catch (DbUpdateException)
        {
            await transaction.RollbackAsync(cancellationToken);
            return new RegisterResult(null, null, null, errors, true);
        }

        return new RegisterResult(accountUuid, profileUuid, email, errors, false);
    }

    public async Task<LoginResult?> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var phone = NormalizePhone(request.Phone);
        var account = await dbContext.Accounts
            .AsNoTracking()
            .SingleOrDefaultAsync(item => item.Phone == phone, cancellationToken);

        if (account is null || account.DeletedAt.HasValue || account.Status != BaseStatus.Active ||
            !passwordHasher.Verify(request.Password, account.Password))
        {
            return null;
        }

        var profile = await dbContext.PatientProfiles
            .AsNoTracking()
            .SingleOrDefaultAsync(item => item.AccountUuid == account.Uuid, cancellationToken);
        if (profile is null)
        {
            return null;
        }

        var issuedAt = DateTimeOffset.UtcNow;
        var accessExpiresAt = issuedAt.AddMinutes(_jwtOptions.AccessTokenMinutes);
        var refreshExpiresAt = issuedAt.AddDays(_jwtOptions.RefreshTokenDays);
        var accessToken = jwtService.CreateToken(CreatePayload(account.Uuid, profile.Email, issuedAt, accessExpiresAt));
        var refreshToken = jwtService.CreateToken(CreatePayload(account.Uuid, profile.Email, issuedAt, refreshExpiresAt));

        return new LoginResult(
            account.Uuid,
            profile.Email,
            issuedAt,
            accessExpiresAt,
            refreshExpiresAt,
            accessToken,
            refreshToken);
    }

    private static AuthTokenPayload CreatePayload(
        Guid uuid,
        string email,
        DateTimeOffset issuedAt,
        DateTimeOffset expiresAt) =>
        new(uuid, email, new TimeDate(issuedAt.ToUnixTimeSeconds(), expiresAt.ToUnixTimeSeconds()));

    private static string NormalizePhone(string phone)
    {
        var normalized = phone.Trim();
        return normalized.StartsWith("+84", StringComparison.Ordinal)
            ? $"0{normalized[3..]}"
            : normalized;
    }
}

public sealed record RegisterResult(
    Guid? AccountUuid,
    Guid? PatientProfileUuid,
    string? Email,
    IReadOnlyDictionary<string, string[]> Errors,
    bool IsConflict);

public sealed record LoginResult(
    Guid Uuid,
    string Email,
    DateTimeOffset IssuedAt,
    DateTimeOffset AccessExpiresAt,
    DateTimeOffset RefreshExpiresAt,
    string AccessToken,
    string RefreshToken);
