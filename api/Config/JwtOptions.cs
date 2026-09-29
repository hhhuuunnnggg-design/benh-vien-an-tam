namespace api.Config;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    public string SecretKey { get; init; } = string.Empty;
    public int AccessTokenMinutes { get; init; } = 15;
    public int RefreshTokenDays { get; init; } = 7;
}
