using System;
using System.Collections.Generic;

namespace ExecutiveInsightUmbraco.Models.Analytics;

public class AnalyticsPageView
{
    public int Id { get; set; }
    public string Path { get; set; } = string.Empty;
    public string PageTitle { get; set; } = string.Empty;
    public string Referrer { get; set; } = string.Empty;
    public string DeviceType { get; set; } = "Desktop";
    public string OperatingSystem { get; set; } = "Unknown";
    public string Browser { get; set; } = "Unknown";
    public string VisitorHash { get; set; } = string.Empty;
    public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
}

public class TrackPageViewDto
{
    public string? Path { get; set; }
    public string? PageTitle { get; set; }
    public string? Referrer { get; set; }
    public string? DeviceType { get; set; }
    public string? OperatingSystem { get; set; }
    public string? Browser { get; set; }
}

public class DailyTrafficStat
{
    public string Date { get; set; } = string.Empty;
    public int Pageviews { get; set; }
    public int UniqueVisitors { get; set; }
}

public class PageStat
{
    public string Path { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int Views { get; set; }
    public double Percentage { get; set; }
}

public class ReferrerStat
{
    public string Source { get; set; } = string.Empty;
    public int Count { get; set; }
    public double Percentage { get; set; }
}

public class BreakdownStat
{
    public string Label { get; set; } = string.Empty;
    public int Count { get; set; }
    public double Percentage { get; set; }
}

public class RecentActivityItem
{
    public int Id { get; set; }
    public string Path { get; set; } = string.Empty;
    public string PageTitle { get; set; } = string.Empty;
    public string Referrer { get; set; } = string.Empty;
    public string DeviceType { get; set; } = string.Empty;
    public string OperatingSystem { get; set; } = string.Empty;
    public string Browser { get; set; } = string.Empty;
    public DateTime TimestampUtc { get; set; }
    public string RelativeTime { get; set; } = string.Empty;
}

public class DashboardAnalyticsDto
{
    public int TotalPageviews { get; set; }
    public int TotalUniqueVisitors { get; set; }
    public double PageviewsTrendPercent { get; set; }
    public double ViewsPerVisitor { get; set; }
    public List<DailyTrafficStat> DailyTraffic { get; set; } = new();
    public List<PageStat> TopPages { get; set; } = new();
    public List<ReferrerStat> TopReferrers { get; set; } = new();
    public List<BreakdownStat> DeviceBreakdown { get; set; } = new();
    public List<BreakdownStat> OsBreakdown { get; set; } = new();
    public List<BreakdownStat> BrowserBreakdown { get; set; } = new();
    public List<RecentActivityItem> RecentActivity { get; set; } = new();
}

public class BackofficeUserDto
{
    public int Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string State { get; set; } = "Active";
    public bool IsActive { get; set; } = true;
    public DateTime? LastLoginDate { get; set; }
    public DateTime CreateDate { get; set; }
    public string? Avatar { get; set; }
    public List<string> Groups { get; set; } = new();
}

public class DashboardOverviewDto
{
    public string CurrentUserName { get; set; } = string.Empty;
    public DateTime ServerTimeUtc { get; set; } = DateTime.UtcNow;
    public bool IsMaintenanceMode { get; set; }
    public bool IsContentFrozen { get; set; }
    public bool IsSiteLocked { get; set; }
    public string LiveStatusText { get; set; } = "Website Online & Live";
    public string LiveStatusClass { get; set; } = "live";
    public int TotalPublishedPages { get; set; }
    public int UnreadInquiriesCount { get; set; }
    public int TotalNewsletterSubscribers { get; set; }
    public int TodayPageviews { get; set; }
    public int WeekPageviews { get; set; }
    public int WeekUniqueVisitors { get; set; }
}
