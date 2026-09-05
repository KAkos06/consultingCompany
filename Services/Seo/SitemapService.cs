using System.Text;
using System.Xml.Linq;
using Microsoft.Extensions.Caching.Memory;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common;
using Umbraco.Extensions;

namespace ExecutiveInsightUmbraco.Services.Seo;

public class SitemapService : ISitemapService
{
    private static readonly XNamespace SitemapNs = "http://www.sitemaps.org/schemas/sitemap/0.9";
    private static readonly HashSet<string> ExcludedDocTypeAliases = new(StringComparer.OrdinalIgnoreCase)
    {
        "site",
        "siteSettings",
        "settings",
        "globalSettings",
        "folder",
        "container",
        "articleContainer",
        "configuration"
    };

    private const string VersionCacheKey = "sitemap_cache_version";
    private readonly IUmbracoContextFactory _umbracoContextFactory;
    private readonly UmbracoHelper _umbracoHelper;
    private readonly ISeoService _seoService;
    private readonly IMemoryCache _memoryCache;

    public SitemapService(
        IUmbracoContextFactory umbracoContextFactory,
        UmbracoHelper umbracoHelper,
        ISeoService seoService,
        IMemoryCache memoryCache)
    {
        _umbracoContextFactory = umbracoContextFactory;
        _umbracoHelper = umbracoHelper;
        _seoService = seoService;
        _memoryCache = memoryCache;
    }

    public void ClearCache()
    {
        _memoryCache.Set(VersionCacheKey, Guid.NewGuid().ToString());
    }

    public string GetSitemapXml(string requestSchemeAndHost)
    {
        var version = _memoryCache.GetOrCreate(VersionCacheKey, _ => Guid.NewGuid().ToString());
        var cacheKey = $"sitemap_xml_{requestSchemeAndHost}_{version}";
        if (_memoryCache.TryGetValue(cacheKey, out string? cachedXml) && !string.IsNullOrEmpty(cachedXml))
        {
            return cachedXml;
        }

        var doc = GetSitemapDocument(requestSchemeAndHost);
        var xmlString = new StringBuilder()
            .Append("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n")
            .Append(doc.ToString())
            .ToString();

        _memoryCache.Set(cacheKey, xmlString, TimeSpan.FromMinutes(10));
        return xmlString;
    }

    public XDocument GetSitemapDocument(string requestSchemeAndHost)
    {
        using var contextRef = _umbracoContextFactory.EnsureUmbracoContext();
        var urlset = new XElement(SitemapNs + "urlset");
        var addedUrls = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        var roots = _umbracoHelper.ContentAtRoot();
        if (roots != null)
        {
            foreach (var root in roots)
            {
                foreach (var content in root.DescendantsOrSelf())
                {
                    if (ShouldIncludeInSitemap(content, out var resolvedUrl))
                    {
                        if (addedUrls.Add(resolvedUrl))
                        {
                            var urlElement = new XElement(SitemapNs + "url",
                                new XElement(SitemapNs + "loc", resolvedUrl),
                                new XElement(SitemapNs + "lastmod", content.UpdateDate.ToString("yyyy-MM-dd"))
                            );
                            urlset.Add(urlElement);
                        }
                    }
                }
            }
        }

        return new XDocument(new XDeclaration("1.0", "utf-8", "yes"), urlset);
    }

    private bool ShouldIncludeInSitemap(IPublishedContent content, out string resolvedUrl)
    {
        resolvedUrl = string.Empty;

        // 1. Check template (technical / data nodes have no template)
        if (content.TemplateId == null || content.TemplateId <= 0)
        {
            return false;
        }

        // 2. Check excluded aliases
        if (ExcludedDocTypeAliases.Contains(content.ContentType.Alias))
        {
            return false;
        }

        // 3. Check element types
        if (content.ContentType.IsElement)
        {
            return false;
        }

        // 4. Check redirects
        if (content.HasProperty("umbracoInternalRedirectId") && content.HasValue("umbracoInternalRedirectId"))
        {
            return false;
        }
        if (content.HasProperty("umbracoRedirect") && content.HasValue("umbracoRedirect"))
        {
            return false;
        }

        // 5. Check public URL
        var pageUrl = content.Url(mode: UrlMode.Absolute);
        if (string.IsNullOrWhiteSpace(pageUrl) || pageUrl == "#")
        {
            return false;
        }

        // 6. Check noIndex
        var metadata = _seoService.GetMetadata(content);
        if (metadata.NoIndex)
        {
            return false;
        }

        // 7. Check canonical URL: if page has an external/different canonical URL, do not index this duplicate page URL
        if (!string.IsNullOrWhiteSpace(metadata.CanonicalUrl))
        {
            var normalizedCanonical = NormalizeUrl(metadata.CanonicalUrl);
            var normalizedPageUrl = NormalizeUrl(pageUrl);
            if (!normalizedCanonical.Equals(normalizedPageUrl, StringComparison.OrdinalIgnoreCase))
            {
                // This page delegates its canonical authority to another page
                return false;
            }
        }

        resolvedUrl = pageUrl;
        return true;
    }

    private static string NormalizeUrl(string url)
    {
        return url.TrimEnd('/');
    }
}
