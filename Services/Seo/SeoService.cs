using System.Text.RegularExpressions;
using ExecutiveInsightUmbraco.Models.Seo;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Extensions;

namespace ExecutiveInsightUmbraco.Services.Seo;

public class SeoService : ISeoService
{
    private const string SiteName = "Executive Insight";
    private const string DefaultFallbackDescription = "Executive Insight - Vezetői coaching és stratégiai mentorálás C-szintű vezetőknek és vezetői csapatoknak — Budapesten és online.";

    public SeoMetadata GetMetadata(IPublishedContent content)
    {
        var metadata = new SeoMetadata();

        // 1. Title Fallback: seoTitle -> pageTitle -> node.Name (+ site brand suffix)
        var seoTitle = content.Value<string>("seoTitle");
        var pageTitle = content.HasProperty("pageTitle") ? content.Value<string>("pageTitle") : null;
        var rawTitle = !string.IsNullOrWhiteSpace(seoTitle)
            ? seoTitle.Trim()
            : (!string.IsNullOrWhiteSpace(pageTitle) ? pageTitle.Trim() : content.Name);

        metadata.Title = rawTitle.Contains(SiteName, StringComparison.OrdinalIgnoreCase)
            ? rawTitle
            : $"{rawTitle} - {SiteName}";

        // 2. Meta Description Fallback: seoDescription -> lead/intro/summary/introduction -> SiteSettings.footerDescription -> default
        var seoDescription = content.Value<string>("seoDescription");
        string? pageIntro = null;
        if (content.HasProperty("lead") && !string.IsNullOrWhiteSpace(content.Value<string>("lead")))
        {
            pageIntro = content.Value<string>("lead");
        }
        else if (content.HasProperty("intro") && !string.IsNullOrWhiteSpace(content.Value<string>("intro")))
        {
            pageIntro = content.Value<string>("intro");
        }
        else if (content.HasProperty("summary") && !string.IsNullOrWhiteSpace(content.Value<string>("summary")))
        {
            pageIntro = content.Value<string>("summary");
        }
        else if (content.HasProperty("introduction") && !string.IsNullOrWhiteSpace(content.Value<string>("introduction")))
        {
            pageIntro = content.Value<string>("introduction");
        }

        string? globalDefaultDesc = null;
        var rootNode = content.Root();
        var siteSettingsNode = rootNode?.Children()?.FirstOrDefault(x => x.ContentType.Alias == "siteSettings")
                               ?? rootNode?.DescendantsOrSelf().FirstOrDefault(x => x.ContentType.Alias == "siteSettings");
        if (siteSettingsNode != null)
        {
            globalDefaultDesc = siteSettingsNode.Value<string>("footerDescription");
        }
        if (string.IsNullOrWhiteSpace(globalDefaultDesc))
        {
            globalDefaultDesc = DefaultFallbackDescription;
        }

        var rawDescription = !string.IsNullOrWhiteSpace(seoDescription)
            ? seoDescription
            : (!string.IsNullOrWhiteSpace(pageIntro) ? pageIntro : globalDefaultDesc);

        metadata.Description = SanitizeDescription(rawDescription);

        // 3. Canonical URL Fallback: canonicalUrl (Single URL Picker) -> content.Url(mode: UrlMode.Absolute)
        metadata.CanonicalUrl = ResolveCanonicalUrl(content);

        // 4. NoIndex & NoFollow
        metadata.NoIndex = content.HasProperty("noIndex") && content.Value<bool>("noIndex");
        metadata.NoFollow = content.HasProperty("noFollow") && content.Value<bool>("noFollow");

        // 5. Social Title: socialTitle -> seoTitle -> pageTitle -> node.Name
        var socialTitle = content.Value<string>("socialTitle");
        metadata.SocialTitle = !string.IsNullOrWhiteSpace(socialTitle) ? socialTitle.Trim() : rawTitle;

        // 6. Social Description: socialDescription -> Description
        var socialDescription = content.Value<string>("socialDescription");
        metadata.SocialDescription = !string.IsNullOrWhiteSpace(socialDescription)
            ? SanitizeDescription(socialDescription)
            : metadata.Description;

        // 7. Social Image: socialImage -> heroImage/image -> null
        metadata.SocialImageUrl = ResolveSocialImageUrl(content);

        // 8. Social URL & Type
        metadata.SocialUrl = metadata.CanonicalUrl;
        metadata.SocialType = "website";

        return metadata;
    }

    public bool IsIndexable(IPublishedContent content)
    {
        return !GetMetadata(content).NoIndex;
    }

    private static string SanitizeDescription(string? input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;

        // Strip HTML
        var text = Regex.Replace(input, "<.*?>", string.Empty);
        text = System.Net.WebUtility.HtmlDecode(text);
        text = Regex.Replace(text, @"\s+", " ").Trim();

        if (text.Length > 165)
        {
            text = text.Substring(0, 160).TrimEnd() + "...";
        }

        return text;
    }

    private static string ResolveCanonicalUrl(IPublishedContent content)
    {
        var rawCanonical = content.HasProperty("canonicalUrl") ? content.Value("canonicalUrl") : null;
        Link? canonicalLink = null;

        if (rawCanonical is IEnumerable<Link> linkEnumerable)
        {
            canonicalLink = linkEnumerable.FirstOrDefault();
        }
        else if (rawCanonical is Link singleLink)
        {
            canonicalLink = singleLink;
        }

        if (canonicalLink != null && !string.IsNullOrWhiteSpace(canonicalLink.Url))
        {
            var targetUrl = canonicalLink.Url;
            if (Uri.TryCreate(targetUrl, UriKind.RelativeOrAbsolute, out var parsedUri) && !parsedUri.IsAbsoluteUri)
            {
                var baseUri = new Uri(content.Url(mode: UrlMode.Absolute));
                return new Uri(baseUri, parsedUri).ToString();
            }
            return targetUrl;
        }

        if (rawCanonical is string stringUrl && !string.IsNullOrWhiteSpace(stringUrl))
        {
            return stringUrl;
        }

        return content.Url(mode: UrlMode.Absolute);
    }

    private static string? ResolveSocialImageUrl(IPublishedContent content)
    {
        if (content.HasProperty("socialImage"))
        {
            var rawMedia = content.Value("socialImage");
            if (rawMedia is MediaWithCrops mediaWithCrops)
            {
                return mediaWithCrops.Url(mode: UrlMode.Absolute);
            }
            if (rawMedia is IEnumerable<MediaWithCrops> mediaList && mediaList.FirstOrDefault() is MediaWithCrops firstMedia)
            {
                return firstMedia.Url(mode: UrlMode.Absolute);
            }
            if (rawMedia is IPublishedContent pubContent)
            {
                return pubContent.Url(mode: UrlMode.Absolute);
            }
        }

        return null;
    }
}
