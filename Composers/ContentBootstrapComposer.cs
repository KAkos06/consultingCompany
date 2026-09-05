using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using System.Text.Json;
using System.Xml.Linq;

namespace ExecutiveInsightUmbraco.Composers;

public class ContentBootstrapComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddNotificationHandler<UmbracoApplicationStartedNotification, ContentBootstrapHandler>();
    }
}

public class ContentBootstrapHandler : INotificationHandler<UmbracoApplicationStartedNotification>
{
    private readonly IMediaService _mediaService;
    private readonly IContentService _contentService;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ContentBootstrapHandler> _logger;

    public ContentBootstrapHandler(
        IMediaService mediaService,
        IContentService contentService,
        IWebHostEnvironment env,
        ILogger<ContentBootstrapHandler> logger)
    {
        _mediaService = mediaService;
        _contentService = contentService;
        _env = env;
        _logger = logger;
    }

    public void Handle(UmbracoApplicationStartedNotification notification)
    {
        EnsureMedia();
        EnsureContentNodes();
        SyncContentFiles();
    }

    private void EnsureMedia()
    {
        EnsureMediaItem(
            key: Guid.Parse("1cf70da6-e8ce-4a82-af8e-4fed52a1173b"),
            name: "Sárosi Georgina",
            relativePath: "/media/georgina/sarosi-georgina.jpg"
        );

        EnsureMediaItem(
            key: Guid.Parse("2cf70da6-e8ce-4a82-af8e-4fed52a1173c"),
            name: "Executive Office",
            relativePath: "/media/office/executive-office.jpg"
        );
    }

    private void EnsureMediaItem(Guid key, string name, string relativePath)
    {
        try
        {
            var existing = _mediaService.GetById(key);
            if (existing != null)
            {
                return;
            }

            var folder = _mediaService.GetById(Guid.Parse("54295fd5-b8ca-4266-9faf-9153cf3b623e"));
            int parentId = folder?.Id ?? -1;

            var media = _mediaService.CreateMedia(name, parentId, "Image");
            media.Key = key;

            var jsonVal = JsonSerializer.Serialize(new
            {
                focalPoint = (object?)null,
                crops = (object?)null,
                src = relativePath
            });

            media.SetValue("umbracoFile", jsonVal);
            _mediaService.Save(media);
            _logger.LogInformation("Successfully created media {Name} with Key {Key}", name, key);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to bootstrap media item {Name}", name);
        }
    }

    private void EnsureContentNodes()
    {
        try
        {
            var homeGuid = Guid.Parse("3f707442-9abc-4677-b69a-b0ce9a0a8d9a");
            var home = _contentService.GetById(homeGuid);
            if (home == null) return;

            var bootstrapFolder = System.IO.Path.Combine(_env.ContentRootPath, "config", "bootstrap");

            // Ensure Executive Coaching page
            var ecGuid = Guid.Parse("55555555-5555-5555-5555-555555555555");
            var ecContent = _contentService.GetById(ecGuid);
            if (ecContent == null)
            {
                ecContent = _contentService.Create("Executive Coaching", home.Id, "contentPage");
                ecContent.Key = ecGuid;
            }

            var ecJsonFile = System.IO.Path.Combine(bootstrapFolder, "executive-coaching-bodygrid.json");
            if (System.IO.File.Exists(ecJsonFile))
            {
                var ecJson = System.IO.File.ReadAllText(ecJsonFile);
                ecContent.SetValue("bodyGrid", ecJson);
                ecContent.SetValue("seoTitle", "Executive Coaching és Vezetői Tanácsadás | Executive Insight");
                ecContent.SetValue("seoDescription", "Személyre szabott C-szintű vezetői coaching, stratégiai sparring és transzformációs kísérés. Diszkrét támogatás Budapesten és online.");
                ecContent.SetValue("showBreadcrumb", "1");
                ecContent.SetValue("noIndex", "0");
                ecContent.SetValue("noFollow", "0");
                _contentService.Save(ecContent);
                _contentService.Publish(ecContent, new[] { "*" });
                _logger.LogInformation("Saved and published Executive Coaching with bodyGrid");
            }

            // Ensure Kapcsolat page
            var kpGuid = Guid.Parse("66666666-6666-6666-6666-666666666666");
            var kpContent = _contentService.GetById(kpGuid);
            if (kpContent == null)
            {
                kpContent = _contentService.Create("Kapcsolat", home.Id, "contentPage");
                kpContent.Key = kpGuid;
            }

            var kpJsonFile = System.IO.Path.Combine(bootstrapFolder, "kapcsolat-bodygrid.json");
            if (System.IO.File.Exists(kpJsonFile))
            {
                var kpJson = System.IO.File.ReadAllText(kpJsonFile);
                kpContent.SetValue("bodyGrid", kpJson);
                kpContent.SetValue("seoTitle", "Kapcsolat | Executive Insight - Vezetői Konzultáció");
                kpContent.SetValue("seoDescription", "Vegye fel a kapcsolatot az Executive Insight csapatával. Személyes és online vezetői tanácsadás, 1:1 C-szintű konzultáció.");
                kpContent.SetValue("showBreadcrumb", "1");
                kpContent.SetValue("noIndex", "0");
                kpContent.SetValue("noFollow", "0");
                _contentService.Save(kpContent);
                _contentService.Publish(kpContent, new[] { "*" });
                _logger.LogInformation("Saved and published Kapcsolat with bodyGrid");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error ensuring content nodes");
        }
    }

    private void SyncContentFiles()
    {
        var syncFolder = System.IO.Path.Combine(_env.ContentRootPath, "uSync", "v17", "Content");
        if (!System.IO.Directory.Exists(syncFolder))
        {
            return;
        }

        var files = new[]
        {
            System.IO.Path.Combine(syncFolder, "site-settings.config"),
            System.IO.Path.Combine(syncFolder, "rólunk.config"),
            System.IO.Path.Combine(syncFolder, "kezdőlap.config")
        };

        foreach (var file in files)
        {
            if (!System.IO.File.Exists(file)) continue;

            try
            {
                var doc = XDocument.Load(file);
                var root = doc.Root;
                if (root == null) continue;

                var keyAttr = root.Attribute("Key")?.Value;
                if (string.IsNullOrEmpty(keyAttr) || !Guid.TryParse(keyAttr, out var key)) continue;

                var content = _contentService.GetById(key);
                if (content == null) continue;

                var propsElem = root.Element("Properties");
                if (propsElem != null)
                {
                    foreach (var prop in propsElem.Elements())
                    {
                        var alias = prop.Name.LocalName;
                        var valElem = prop.Element("Value");
                        if (valElem != null)
                        {
                            content.SetValue(alias, valElem.Value);
                        }
                    }

                    _contentService.Save(content);
                    var publishResult = _contentService.Publish(content, new[] { "*" });
                    if (publishResult.Success)
                    {
                        _logger.LogInformation("Successfully synced and published content {Name} ({Key}) from {File}", content.Name, key, System.IO.Path.GetFileName(file));
                    }
                    else
                    {
                        _logger.LogWarning("Saved but publish had issue for content {Name} ({Key}): {Status}", content.Name, key, publishResult.Result);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error syncing content file {File}", file);
            }
        }
    }
}
