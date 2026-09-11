using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ExecutiveInsightUmbraco.Models.Analytics;

namespace ExecutiveInsightUmbraco.Services.Analytics;

public interface IAnalyticsService
{
    Task EnsureDatabaseTableAsync();
    Task TrackPageViewAsync(TrackPageViewDto dto, string? clientIp);
    Task<DashboardAnalyticsDto> GetDashboardAnalyticsAsync(int days = 7);
    Task<string> ExportAnalyticsCsvAsync(int days = 30);
    Task<(int todayViews, int weekViews, int weekVisitors)> GetSummaryStatsAsync();
}
