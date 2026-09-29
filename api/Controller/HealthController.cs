using Microsoft.AspNetCore.Mvc;

namespace api.Controller;

[ApiController]
[Route("api/check-health")]
public sealed class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult CheckHealth() => Ok(new
    {
        status = "healthy",
        timestamp = DateTimeOffset.UtcNow
    });
}
