
using Microsoft.AspNetCore.HttpOverrides;
using OpenIddict.Server.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// The application is only reachable through Caddy in Docker. Trust its forwarded
// protocol headers so Umbraco generates HTTPS URLs and secure backoffice cookies.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

// In Production mode OpenIddict requires HTTPS by default.
// When running locally over HTTP (or behind a plain HTTP proxy), allow HTTP if explicitly
// configured or if UmbracoApplicationUrl starts with http://.
builder.Services.PostConfigure<OpenIddictServerAspNetCoreOptions>(options =>
{
    var appUrl = builder.Configuration.GetValue<string>("Umbraco:CMS:WebRouting:UmbracoApplicationUrl");
    var disableHttpsRequirement = builder.Configuration.GetValue<bool>("OpenIddict:DisableTransportSecurityRequirement");

    if (disableHttpsRequirement || (!string.IsNullOrEmpty(appUrl) && appUrl.StartsWith("http://", StringComparison.OrdinalIgnoreCase)))
    {
        options.DisableTransportSecurityRequirement = true;
    }
});

builder.Services.AddControllersWithViews()
    .AddSessionStateTempDataProvider();
builder.Services.AddSession();

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

app.UseDeveloperExceptionPage();

app.UseForwardedHeaders();

await app.BootUmbracoAsync();

app.UseSession();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
        u.EndpointRouteBuilder.MapControllers();
    });

await app.RunAsync();
