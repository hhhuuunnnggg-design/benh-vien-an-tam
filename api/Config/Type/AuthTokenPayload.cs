namespace api.Config.Type;

public sealed record AuthTokenPayload(Guid Uuid, string Email, TimeDate TimeDate);

public sealed record TimeDate(long Iat, long Exp);
