using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common;
using Umbraco.Extensions;

namespace ExecutiveInsightUmbraco.Services.Security;

public class TurnstileService : ITurnstileService
{
    private readonly IUmbracoContextFactory _umbracoContextFactory;
    private readonly UmbracoHelper _umbracoHelper;
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<TurnstileService> _logger;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public TurnstileService(
        IUmbracoContextFactory umbracoContextFactory,
        UmbracoHelper umbracoHelper,
        HttpClient httpClient,
        IConfiguration configuration,
        ILogger<TurnstileService> logger)
    {
        _umbracoContextFactory = umbracoContextFactory;
        _umbracoHelper = umbracoHelper;
        _httpClient = httpClient;
        _configuration = configuration;
        _logger = logger;
    }

    public bool IsEnabled()
    {
        var configEnabled = _configuration.GetValue<bool?>("Turnstile:Enabled");
        if (configEnabled.HasValue) return configEnabled.Value;

        var node = GetSettingsNode();
        return node?.Value<bool>("enableTurnstile") ?? false;
    }

    public string? GetSiteKey()
    {
        var configSiteKey = _configuration["Turnstile:SiteKey"];
        return !string.IsNullOrWhiteSpace(configSiteKey) ? configSiteKey.Trim() : null;
    }

    private string? GetSecretKey()
    {
        var configSecretKey = _configuration["Turnstile:SecretKey"];
        return !string.IsNullOrWhiteSpace(configSecretKey) ? configSecretKey.Trim() : null;
    }

    public async Task<bool> VerifyTokenAsync(string? token, string? remoteIp = null)
    {
        if (!IsEnabled())
        {
            return true;
        }

        var secretKey = GetSecretKey();
        if (string.IsNullOrWhiteSpace(secretKey))
        {
            _logger.LogWarning("Cloudflare Turnstile is enabled in Site Settings, but Turnstile Secret Key is empty. Allowing submission to avoid blocking users.");
            return true;
        }

        if (string.IsNullOrWhiteSpace(token))
        {
            _logger.LogWarning("Cloudflare Turnstile verification failed: submitted token is empty.");
            return false;
        }

        try
        {
            var formValues = new Dictionary<string, string>
            {
                { "secret", secretKey },
                { "response", token }
            };

            if (!string.IsNullOrWhiteSpace(remoteIp))
            {
                formValues.Add("remoteip", remoteIp);
            }

            using var formContent = new FormUrlEncodedContent(formValues);
            var response = await _httpClient.PostAsync("https://challenges.cloudflare.com/turnstile/v0/siteverify", formContent);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Cloudflare Turnstile API call failed with status code {StatusCode}", response.StatusCode);
                return false;
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<TurnstileVerifyResponse>(responseBody, JsonOptions);

            if (result == null || !result.Success)
            {
                _logger.LogWarning("Cloudflare Turnstile verification rejected token. Error codes: {Errors}",
                    result?.ErrorCodes != null ? string.Join(", ", result.ErrorCodes) : "none");
                return false;
            }

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error occurred during Cloudflare Turnstile token verification.");
            return false;
        }
    }

    private IPublishedContent? GetSettingsNode()
    {
        try
        {
            using var contextRef = _umbracoContextFactory.EnsureUmbracoContext();
            var roots = _umbracoHelper.ContentAtRoot();
            if (roots == null) return null;

            foreach (var root in roots)
            {
                if (root.ContentType.Alias.Equals("siteSettings", StringComparison.OrdinalIgnoreCase) ||
                    root.ContentType.Alias.Equals("settings", StringComparison.OrdinalIgnoreCase))
                {
                    return root;
                }

                var childSettings = root.Children()?.FirstOrDefault(x =>
                    x.ContentType.Alias.Equals("siteSettings", StringComparison.OrdinalIgnoreCase) ||
                    x.ContentType.Alias.Equals("settings", StringComparison.OrdinalIgnoreCase));

                if (childSettings != null)
                {
                    return childSettings;
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving SiteSettings node for Turnstile configuration.");
        }

        return null;
    }

    private class TurnstileVerifyResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("error-codes")]
        public List<string>? ErrorCodes { get; set; }

        [JsonPropertyName("challenge_ts")]
        public string? ChallengeTs { get; set; }

        [JsonPropertyName("hostname")]
        public string? Hostname { get; set; }
    }
}
