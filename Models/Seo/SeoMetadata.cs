namespace ExecutiveInsightUmbraco.Models.Seo;

public class SeoMetadata
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? CanonicalUrl { get; set; }
    public bool NoIndex { get; set; }
    public bool NoFollow { get; set; }

    public string Robots => (NoIndex, NoFollow) switch
    {
        (true, true) => "noindex,nofollow",
        (true, false) => "noindex,follow",
        (false, true) => "index,nofollow",
        (false, false) => "index,follow"
    };

    public string SocialTitle { get; set; } = string.Empty;
    public string SocialDescription { get; set; } = string.Empty;
    public string? SocialImageUrl { get; set; }
    public string? SocialUrl { get; set; }
    public string SocialType { get; set; } = "website";
}
