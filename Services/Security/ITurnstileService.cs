namespace ExecutiveInsightUmbraco.Services.Security;

public interface ITurnstileService
{
    bool IsEnabled();
    string? GetSiteKey();
    Task<bool> VerifyTokenAsync(string? token, string? remoteIp = null);
}
