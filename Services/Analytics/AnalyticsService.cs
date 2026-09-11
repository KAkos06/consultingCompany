using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using ExecutiveInsightUmbraco.Models.Analytics;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Scoping;

namespace ExecutiveInsightUmbraco.Services.Analytics;

public class AnalyticsService : IAnalyticsService
{
    private readonly IScopeProvider _scopeProvider;
    private readonly ILogger<AnalyticsService> _logger;
    private const string Salt = "EI_Consulting_Analytics_2026_Salt";

    public AnalyticsService(IScopeProvider scopeProvider, ILogger<AnalyticsService> logger)
    {
        _scopeProvider = scopeProvider;
        _logger = logger;
    }

    public Task EnsureDatabaseTableAsync()
    {
        try
        {
            using var scope = _scopeProvider.CreateScope();
            var db = scope.Database;
            var isSqlServer = db.DatabaseType.GetType().Name.Contains("SqlServer", StringComparison.OrdinalIgnoreCase);

            if (isSqlServer)
            {
                db.Execute(@"
                    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AnalyticsPageViews]') AND type in (N'U'))
                    BEGIN
                        CREATE TABLE [dbo].[AnalyticsPageViews] (
                            [Id] INT IDENTITY(1,1) PRIMARY KEY,
                            [Path] NVARCHAR(500) NOT NULL,
                            [PageTitle] NVARCHAR(500) NULL,
                            [Referrer] NVARCHAR(500) NULL,
                            [DeviceType] NVARCHAR(50) NOT NULL,
                            [OperatingSystem] NVARCHAR(50) NULL,
                            [Browser] NVARCHAR(50) NOT NULL,
                            [VisitorHash] NVARCHAR(64) NOT NULL,
                            [TimestampUtc] DATETIME NOT NULL
                        );
                        CREATE INDEX IX_AnalyticsPageViews_TimestampUtc ON [dbo].[AnalyticsPageViews] ([TimestampUtc]);
                    END
                ");
            }
            else
            {
                db.Execute(@"
                    CREATE TABLE IF NOT EXISTS [AnalyticsPageViews] (
                        [Id] INTEGER PRIMARY KEY AUTOINCREMENT,
                        [Path] TEXT NOT NULL,
                        [PageTitle] TEXT,
                        [Referrer] TEXT,
                        [DeviceType] TEXT NOT NULL,
                        [OperatingSystem] TEXT,
                        [Browser] TEXT NOT NULL,
                        [VisitorHash] TEXT NOT NULL,
                        [TimestampUtc] DATETIME NOT NULL
                    );
                    CREATE INDEX IF NOT EXISTS IX_AnalyticsPageViews_TimestampUtc ON [AnalyticsPageViews] ([TimestampUtc]);
                ");
            }

            scope.Complete();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error ensuring AnalyticsPageViews table exists.");
        }

        return Task.CompletedTask;
    }

    public async Task TrackPageViewAsync(TrackPageViewDto dto, string? clientIp)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.Path)) return;

        try
        {
            var cleanPath = dto.Path.Trim();
            if (cleanPath.StartsWith("/umbraco", StringComparison.OrdinalIgnoreCase) ||
                cleanPath.StartsWith("/api", StringComparison.OrdinalIgnoreCase) ||
                cleanPath.StartsWith("/App_Plugins", StringComparison.OrdinalIgnoreCase))
            {
                return; // Do not track backoffice or internal API requests
            }

            var now = DateTime.UtcNow;
            var ip = clientIp ?? "127.0.0.1";
            var visitorHash = ComputeHash(ip, now);

            using var scope = _scopeProvider.CreateScope();
            var db = scope.Database;

            db.Execute(@"
                INSERT INTO AnalyticsPageViews (Path, PageTitle, Referrer, DeviceType, OperatingSystem, Browser, VisitorHash, TimestampUtc)
                VALUES (@0, @1, @2, @3, @4, @5, @6, @7)
            ",
                cleanPath,
                string.IsNullOrWhiteSpace(dto.PageTitle) ? cleanPath : dto.PageTitle.Trim(),
                string.IsNullOrWhiteSpace(dto.Referrer) ? "Direct / Bookmarks" : CleanReferrer(dto.Referrer),
                string.IsNullOrWhiteSpace(dto.DeviceType) ? "Desktop" : dto.DeviceType,
                string.IsNullOrWhiteSpace(dto.OperatingSystem) ? "Unknown" : dto.OperatingSystem,
                string.IsNullOrWhiteSpace(dto.Browser) ? "Unknown" : dto.Browser,
                visitorHash,
                now
            );

            scope.Complete();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error tracking pageview for path: {Path}", dto.Path);
        }
    }

    public async Task<DashboardAnalyticsDto> GetDashboardAnalyticsAsync(int days = 7)
    {
        var result = new DashboardAnalyticsDto();
        if (days <= 0) days = 7;

        var toUtc = DateTime.UtcNow;
        var fromUtc = toUtc.Date.AddDays(-days + 1);

        try
        {
            using var scope = _scopeProvider.CreateScope();
            var db = scope.Database;

            var rows = db.Fetch<AnalyticsPageView>(@"
                SELECT * FROM AnalyticsPageViews
                WHERE TimestampUtc >= @0 AND TimestampUtc <= @1
                ORDER BY TimestampUtc ASC
            ", fromUtc, toUtc);

            result.TotalPageviews = rows.Count;
            result.TotalUniqueVisitors = rows.Select(r => r.VisitorHash).Distinct().Count();
            result.ViewsPerVisitor = result.TotalUniqueVisitors > 0 
                ? Math.Round((double)result.TotalPageviews / result.TotalUniqueVisitors, 1) 
                : 0.0;

            // Trend vs previous period
            var prevFromUtc = fromUtc.AddDays(-days);
            var prevCount = db.ExecuteScalar<int>(@"
                SELECT COUNT(*) FROM AnalyticsPageViews
                WHERE TimestampUtc >= @0 AND TimestampUtc < @1
            ", prevFromUtc, fromUtc);

            if (prevCount > 0)
            {
                result.PageviewsTrendPercent = Math.Round(((double)result.TotalPageviews - prevCount) / prevCount * 100.0, 1);
            }
            else
            {
                result.PageviewsTrendPercent = result.TotalPageviews > 0 ? 100.0 : 0.0;
            }

            // Daily traffic series
            for (int i = 0; i < days; i++)
            {
                var targetDate = fromUtc.AddDays(i);
                var dateKey = targetDate.ToString("yyyy-MM-dd");
                var label = targetDate.ToString("MMM dd", CultureInfo.InvariantCulture);

                var dayRows = rows.Where(r => r.TimestampUtc.ToString("yyyy-MM-dd") == dateKey).ToList();
                result.DailyTraffic.Add(new DailyTrafficStat
                {
                    Date = label,
                    Pageviews = dayRows.Count,
                    UniqueVisitors = dayRows.Select(r => r.VisitorHash).Distinct().Count()
                });
            }

            // Top Pages
            var pageGroups = rows.GroupBy(r => r.Path)
                .OrderByDescending(g => g.Count())
                .Take(8)
                .ToList();

            foreach (var g in pageGroups)
            {
                var count = g.Count();
                var first = g.FirstOrDefault();
                result.TopPages.Add(new PageStat
                {
                    Path = g.Key,
                    Title = string.IsNullOrWhiteSpace(first?.PageTitle) ? g.Key : first.PageTitle,
                    Views = count,
                    Percentage = result.TotalPageviews > 0 ? Math.Round((double)count / result.TotalPageviews * 100.0, 1) : 0
                });
            }

            // Top Referrers
            var refGroups = rows.GroupBy(r => r.Referrer)
                .OrderByDescending(g => g.Count())
                .Take(5)
                .ToList();

            foreach (var g in refGroups)
            {
                var count = g.Count();
                result.TopReferrers.Add(new ReferrerStat
                {
                    Source = string.IsNullOrWhiteSpace(g.Key) ? "Direct / Bookmarks" : g.Key,
                    Count = count,
                    Percentage = result.TotalPageviews > 0 ? Math.Round((double)count / result.TotalPageviews * 100.0, 1) : 0
                });
            }

            // Device Breakdown
            var devGroups = rows.GroupBy(r => r.DeviceType)
                .OrderByDescending(g => g.Count())
                .ToList();

            foreach (var g in devGroups)
            {
                var count = g.Count();
                result.DeviceBreakdown.Add(new BreakdownStat
                {
                    Label = string.IsNullOrWhiteSpace(g.Key) ? "Desktop" : g.Key,
                    Count = count,
                    Percentage = result.TotalPageviews > 0 ? Math.Round((double)count / result.TotalPageviews * 100.0, 1) : 0
                });
            }

            // OS Breakdown
            var osGroups = rows.GroupBy(r => string.IsNullOrWhiteSpace(r.OperatingSystem) ? "Unknown" : r.OperatingSystem)
                .OrderByDescending(g => g.Count())
                .ToList();

            foreach (var g in osGroups)
            {
                var count = g.Count();
                result.OsBreakdown.Add(new BreakdownStat
                {
                    Label = g.Key,
                    Count = count,
                    Percentage = result.TotalPageviews > 0 ? Math.Round((double)count / result.TotalPageviews * 100.0, 1) : 0
                });
            }

            // Browser Breakdown
            var browserGroups = rows.GroupBy(r => string.IsNullOrWhiteSpace(r.Browser) ? "Unknown" : r.Browser)
                .OrderByDescending(g => g.Count())
                .ToList();

            foreach (var g in browserGroups)
            {
                var count = g.Count();
                result.BrowserBreakdown.Add(new BreakdownStat
                {
                    Label = g.Key,
                    Count = count,
                    Percentage = result.TotalPageviews > 0 ? Math.Round((double)count / result.TotalPageviews * 100.0, 1) : 0
                });
            }

            // Real-time Recent Activity Stream (last 10 genuine visits)
            var recentHits = rows
                .OrderByDescending(r => r.TimestampUtc)
                .Take(10)
                .Select(r => new RecentActivityItem
                {
                    Id = r.Id,
                    Path = r.Path,
                    PageTitle = string.IsNullOrWhiteSpace(r.PageTitle) ? r.Path : r.PageTitle,
                    Referrer = r.Referrer,
                    DeviceType = r.DeviceType,
                    OperatingSystem = string.IsNullOrWhiteSpace(r.OperatingSystem) ? "Unknown" : r.OperatingSystem,
                    Browser = r.Browser,
                    TimestampUtc = r.TimestampUtc,
                    RelativeTime = FormatRelativeTime(r.TimestampUtc)
                })
                .ToList();

            result.RecentActivity = recentHits;

            scope.Complete();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating dashboard analytics.");
        }

        return result;
    }

    public async Task<string> ExportAnalyticsCsvAsync(int days = 30)
    {
        var sb = new StringBuilder();
        sb.AppendLine("Timestamp (UTC),Path,Page Title,Referrer,Device,Operating System,Browser");

        try
        {
            var fromUtc = days > 0 ? DateTime.UtcNow.AddDays(-days) : DateTime.MinValue;
            using var scope = _scopeProvider.CreateScope();
            var db = scope.Database;

            var rows = db.Fetch<AnalyticsPageView>(@"
                SELECT * FROM AnalyticsPageViews
                WHERE TimestampUtc >= @0
                ORDER BY TimestampUtc DESC
            ", fromUtc);

            foreach (var r in rows)
            {
                sb.AppendLine($"\"{r.TimestampUtc:yyyy-MM-dd HH:mm:ss}\",\"{EscapeCsv(r.Path)}\",\"{EscapeCsv(r.PageTitle)}\",\"{EscapeCsv(r.Referrer)}\",\"{EscapeCsv(r.DeviceType)}\",\"{EscapeCsv(r.OperatingSystem)}\",\"{EscapeCsv(r.Browser)}\"");
            }

            scope.Complete();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error exporting analytics CSV.");
        }

        return sb.ToString();
    }

    public async Task<(int todayViews, int weekViews, int weekVisitors)> GetSummaryStatsAsync()
    {
        int todayViews = 0;
        int weekViews = 0;
        int weekVisitors = 0;

        try
        {
            var todayDate = DateTime.UtcNow.Date;
            var weekDate = todayDate.AddDays(-6);

            using var scope = _scopeProvider.CreateScope();
            var db = scope.Database;

            todayViews = db.ExecuteScalar<int>(@"
                SELECT COUNT(*) FROM AnalyticsPageViews
                WHERE TimestampUtc >= @0
            ", todayDate);

            var weekRows = db.Fetch<AnalyticsPageView>(@"
                SELECT VisitorHash FROM AnalyticsPageViews
                WHERE TimestampUtc >= @0
            ", weekDate);

            weekViews = weekRows.Count;
            weekVisitors = weekRows.Select(r => r.VisitorHash).Distinct().Count();

            scope.Complete();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching summary stats.");
        }

        return (todayViews, weekViews, weekVisitors);
    }

    private static string ComputeHash(string ip, DateTime date)
    {
        var dateStr = date.ToString("yyyyMMdd");
        using var sha = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes($"{ip}_{Salt}_{dateStr}");
        var hash = sha.ComputeHash(bytes);
        return Convert.ToHexString(hash).Substring(0, 16);
    }

    private static string CleanReferrer(string rawRef)
    {
        try
        {
            if (Uri.TryCreate(rawRef, UriKind.Absolute, out var uri))
            {
                var host = uri.Host.ToLowerInvariant();
                if (host.Contains("google")) return "Google Search";
                if (host.Contains("bing")) return "Bing Search";
                if (host.Contains("linkedin")) return "LinkedIn";
                if (host.Contains("twitter") || host.Contains("t.co") || host.Contains("x.com")) return "Twitter / X";
                if (host.Contains("facebook")) return "Facebook";
                if (host.Contains("localhost") || host.Contains("executiveinsight")) return "Internal Navigation";
                return host;
            }
        }
        catch {}
        return rawRef.Length > 50 ? rawRef.Substring(0, 50) : rawRef;
    }

    private static string FormatRelativeTime(DateTime utc)
    {
        var diff = DateTime.UtcNow - utc;
        if (diff.TotalSeconds < 60) return "Just now";
        if (diff.TotalMinutes < 60) return $"{(int)diff.TotalMinutes}m ago";
        if (diff.TotalHours < 24) return $"{(int)diff.TotalHours}h ago";
        if (diff.TotalDays < 2) return "Yesterday";
        return $"{(int)diff.TotalDays}d ago";
    }

    private static string EscapeCsv(string? val)
    {
        if (string.IsNullOrEmpty(val)) return string.Empty;
        return val.Replace("\"", "\"\"");
    }
}
