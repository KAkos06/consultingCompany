using ExecutiveInsightUmbraco.Models.Seo;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace ExecutiveInsightUmbraco.Services.Seo;

public interface ISeoService
{
    SeoMetadata GetMetadata(IPublishedContent content);
    bool IsIndexable(IPublishedContent content);
}
