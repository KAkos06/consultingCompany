using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExecutiveInsightUmbraco.Models.Analytics;
using ExecutiveInsightUmbraco.Services.Analytics;
using ExecutiveInsightUmbraco.Services.Forms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Authorization;

namespace ExecutiveInsightUmbraco.Controllers;

[ApiController]
public class DashboardApiController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IContentService _contentService;
    private readonly IFormsService _formsService;
    private readonly IAnalyticsService _analyticsService;
    private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
    private readonly IConfiguration _configuration;
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<DashboardApiController> _logger;

    public DashboardApiController(
        IUserService userService,
        IContentService contentService,
        IFormsService formsService,
        IAnalyticsService analyticsService,
        IBackOfficeSecurityAccessor backOfficeSecurityAccessor,
        IConfiguration configuration,
        IServiceProvider serviceProvider,
        ILogger<DashboardApiController> logger)
    {
        _userService = userService;
        _contentService = contentService;
        _formsService = formsService;
        _analyticsService = analyticsService;
        _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
        _configuration = configuration;
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    // ==========================================
    // Public Analytics Tracking Beacon
    // ==========================================

    [HttpPost("api/analytics/track")]
    public async Task<IActionResult> TrackPageView([FromBody] TrackPageViewDto dto)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.Path))
        {
            return Ok(); // Silent return
        }

        var clientIp = HttpContext.Connection.RemoteIpAddress?.ToString();
        await _analyticsService.TrackPageViewAsync(dto, clientIp);
        return Ok(new { tracked = true });
    }

    // ==========================================
    // Backoffice Dashboard Endpoints
    // ==========================================

    [HttpGet("umbraco/api/dashboard/overview")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> GetOverview()
    {
        var currentUser = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
        var userName = currentUser?.Name ?? "Admin";

        // Query real-time Maintenance Manager status
        bool isMaintenance = false;
        bool isFrozen = false;
        bool isLocked = false;

        try
        {
            var maintenanceService = _serviceProvider.GetService<Our.Umbraco.MaintenanceMode.Interfaces.IMaintenanceModeService>();
            if (maintenanceService != null)
            {
                isMaintenance = maintenanceService.IsInMaintenanceMode;
                isFrozen = maintenanceService.IsContentFrozen;
                isLocked = maintenanceService.IsSiteLocked;
            }
            else
            {
                isMaintenance = _configuration.GetValue<bool>("MaintenanceMode:IsInMaintenanceMode");
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not resolve IMaintenanceModeService, falling back to configuration.");
            isMaintenance = _configuration.GetValue<bool>("MaintenanceMode:IsInMaintenanceMode");
        }

        var publishedPages = _contentService.CountPublished();

        var contacts = await _formsService.GetAllContactSubmissionsAsync();
        var unreadInquiries = contacts.Count(c => !c.IsRead);

        var newsletters = await _formsService.GetAllNewsletterSubscribersAsync();
        var activeSubscribers = newsletters.Count(n => n.IsActive);

        var (todayViews, weekViews, weekVisitors) = await _analyticsService.GetSummaryStatsAsync();

        var overview = new DashboardOverviewDto
        {
            CurrentUserName = userName,
            ServerTimeUtc = DateTime.UtcNow,
            IsMaintenanceMode = isMaintenance,
            IsContentFrozen = isFrozen,
            IsSiteLocked = isLocked,
            LiveStatusText = isMaintenance ? "Maintenance Mode Active" : "Website Online & Live",
            LiveStatusClass = isMaintenance ? "maintenance" : "live",
            TotalPublishedPages = publishedPages,
            UnreadInquiriesCount = unreadInquiries,
            TotalNewsletterSubscribers = activeSubscribers,
            TodayPageviews = todayViews,
            WeekPageviews = weekViews,
            WeekUniqueVisitors = weekVisitors
        };

        return Ok(overview);
    }

    [HttpGet("umbraco/api/dashboard/users")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public IActionResult GetAllUsers()
    {
        var users = _userService.GetAll(0, int.MaxValue, out _);
        var result = users.Select(u => new BackofficeUserDto
        {
            Id = u.Id,
            Key = u.Key.ToString(),
            Name = u.Name ?? u.Username ?? "Unknown User",
            Email = u.Email ?? "",
            Username = u.Username ?? "",
            State = u.UserState.ToString(),
            IsActive = u.UserState == Umbraco.Cms.Core.Models.Membership.UserState.Active,
            LastLoginDate = u.LastLoginDate,
            CreateDate = u.CreateDate,
            Avatar = u.Avatar,
            Groups = u.Groups.Select(g => g.Name ?? g.Alias).ToList()
        })
        .OrderByDescending(u => u.LastLoginDate ?? u.CreateDate)
        .ToList();

        return Ok(result);
    }

    [HttpGet("umbraco/api/dashboard/analytics")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> GetAnalytics([FromQuery] int days = 7)
    {
        if (days <= 0 || days > 365) days = 7;
        var data = await _analyticsService.GetDashboardAnalyticsAsync(days);
        return Ok(data);
    }

    [HttpGet("umbraco/api/dashboard/inquiries")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> GetRecentInquiries([FromQuery] int count = 5)
    {
        var contacts = await _formsService.GetAllContactSubmissionsAsync();
        var recent = contacts
            .OrderByDescending(c => c.CreatedAt)
            .Take(Math.Clamp(count, 1, 20))
            .ToList();

        return Ok(recent);
    }

    [HttpGet("umbraco/api/dashboard/analytics/export")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> ExportAnalytics([FromQuery] int days = 30)
    {
        var csv = await _analyticsService.ExportAnalyticsCsvAsync(days);
        var bytes = Encoding.UTF8.GetBytes(csv);
        var preamble = Encoding.UTF8.GetPreamble();
        var fullBytes = new byte[preamble.Length + bytes.Length];
        Buffer.BlockCopy(preamble, 0, fullBytes, 0, preamble.Length);
        Buffer.BlockCopy(bytes, 0, fullBytes, preamble.Length, bytes.Length);

        var filename = days > 0
            ? $"analytics_traffic_{days}d_{DateTime.UtcNow:yyyyMMdd}.csv"
            : $"analytics_traffic_all_{DateTime.UtcNow:yyyyMMdd}.csv";

        return File(fullBytes, "text/csv; charset=utf-8", filename);
    }
}
