using System.Text;
using ExecutiveInsightUmbraco.Services.Seo;
using Microsoft.AspNetCore.Mvc;

namespace ExecutiveInsightUmbraco.Controllers;

[ApiController]
public class SitemapController : ControllerBase
{
    private readonly ISitemapService _sitemapService;

    public SitemapController(ISitemapService sitemapService)
    {
        _sitemapService = sitemapService;
    }

    [HttpGet]
    [Route("sitemap.xml")]
    [Produces("application/xml")]
    public IActionResult Index()
    {
        var schemeAndHost = $"{Request.Scheme}://{Request.Host}";
        var xml = _sitemapService.GetSitemapXml(schemeAndHost);
        return Content(xml, "application/xml", Encoding.UTF8);
    }
}
