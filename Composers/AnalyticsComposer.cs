using ExecutiveInsightUmbraco.Services.Analytics;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace ExecutiveInsightUmbraco.Composers;

public class AnalyticsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddScoped<IAnalyticsService, AnalyticsService>();
        builder.AddNotificationHandler<UmbracoApplicationStartedNotification, AnalyticsDatabaseHandler>();
    }
}

public class AnalyticsDatabaseHandler : INotificationHandler<UmbracoApplicationStartedNotification>
{
    private readonly IAnalyticsService _analyticsService;

    public AnalyticsDatabaseHandler(IAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    public void Handle(UmbracoApplicationStartedNotification notification)
    {
        _analyticsService.EnsureDatabaseTableAsync().GetAwaiter().GetResult();
    }
}
