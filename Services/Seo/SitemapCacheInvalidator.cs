using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace ExecutiveInsightUmbraco.Services.Seo;

public class SitemapCacheInvalidator : 
    INotificationHandler<ContentPublishedNotification>, 
    INotificationHandler<ContentUnpublishedNotification>
{
    private readonly ISitemapService _sitemapService;

    public SitemapCacheInvalidator(ISitemapService sitemapService)
    {
        _sitemapService = sitemapService;
    }

    public void Handle(ContentPublishedNotification notification)
    {
        _sitemapService.ClearCache();
    }

    public void Handle(ContentUnpublishedNotification notification)
    {
        _sitemapService.ClearCache();
    }
}
