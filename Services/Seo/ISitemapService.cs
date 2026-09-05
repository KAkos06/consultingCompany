using System.Xml.Linq;

namespace ExecutiveInsightUmbraco.Services.Seo;

public interface ISitemapService
{
    string GetSitemapXml(string requestSchemeAndHost);
    XDocument GetSitemapDocument(string requestSchemeAndHost);
    void ClearCache();
}
