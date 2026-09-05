using ExecutiveInsightUmbraco.Services.Seo;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;

namespace ExecutiveInsightUmbraco.Composers;

public class SeoComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<ISeoService, SeoService>();
        builder.Services.AddScoped<ISitemapService, SitemapService>();

        builder.AddNotificationHandler<ContentPublishedNotification, SitemapCacheInvalidator>();
        builder.AddNotificationHandler<ContentUnpublishedNotification, SitemapCacheInvalidator>();
    }
}
