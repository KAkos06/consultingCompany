using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace ExecutiveInsightUmbraco.Controllers;

[ApiController]
public class RobotsController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public RobotsController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpGet]
    [Route("robots.txt")]
    [Produces("text/plain")]
    public IActionResult Index()
    {
        var sb = new StringBuilder();

        if (_env.IsProduction())
        {
            sb.AppendLine("User-agent: *");
            sb.AppendLine("Allow: /");
            sb.AppendLine();
            sb.AppendLine($"Sitemap: {Request.Scheme}://{Request.Host}/sitemap.xml");
        }
        else
        {
            sb.AppendLine("User-agent: *");
            sb.AppendLine("Disallow: /");
        }

        return Content(sb.ToString(), "text/plain", Encoding.UTF8);
    }
}
