using ExecutiveInsightUmbraco.Services.Security;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace ExecutiveInsightUmbraco.Composers;

public class SecurityComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddHttpClient<ITurnstileService, TurnstileService>();
    }
}
