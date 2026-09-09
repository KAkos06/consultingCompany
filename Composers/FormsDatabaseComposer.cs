using ExecutiveInsightUmbraco.Services.Forms;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace ExecutiveInsightUmbraco.Composers;

public class FormsDatabaseComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<IEmailNotificationService, EmailNotificationService>();
        builder.Services.AddScoped<IFormsService, FormsService>();
        builder.AddNotificationHandler<UmbracoApplicationStartedNotification, FormsDatabaseHandler>();
    }
}

public class FormsDatabaseHandler : INotificationHandler<UmbracoApplicationStartedNotification>
{
    private readonly IFormsService _formsService;

    public FormsDatabaseHandler(IFormsService formsService)
    {
        _formsService = formsService;
    }

    public void Handle(UmbracoApplicationStartedNotification notification)
    {
        _formsService.EnsureDatabaseTablesAsync().GetAwaiter().GetResult();
    }
}
