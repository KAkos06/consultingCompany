using System.Text;
using ExecutiveInsightUmbraco.Models.Forms;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Scoping;

namespace ExecutiveInsightUmbraco.Services.Forms;

public class FormsService : IFormsService
{
    private readonly IScopeProvider _scopeProvider;
    private readonly ILogger<FormsService> _logger;

    public FormsService(IScopeProvider scopeProvider, ILogger<FormsService> logger)
    {
        _scopeProvider = scopeProvider;
        _logger = logger;
    }

    public Task EnsureDatabaseTablesAsync()
    {
        try
        {
            using var scope = _scopeProvider.CreateScope();
            var db = scope.Database;
            var isSqlServer = db.DatabaseType.GetType().Name.Contains("SqlServer", StringComparison.OrdinalIgnoreCase);

            if (isSqlServer)
            {
                db.Execute(@"
                    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ContactSubmissions]') AND type in (N'U'))
                    BEGIN
                        CREATE TABLE [dbo].[ContactSubmissions] (
                            [Id] INT IDENTITY(1,1) PRIMARY KEY,
                            [Name] NVARCHAR(255) NOT NULL,
                            [Email] NVARCHAR(255) NOT NULL,
                            [Company] NVARCHAR(255) NULL,
                            [Message] NVARCHAR(MAX) NOT NULL,
                            [CreatedAt] DATETIME NOT NULL,
                            [IsRead] BIT NOT NULL DEFAULT 0
                        );
                    END

                    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[NewsletterSubscribers]') AND type in (N'U'))
                    BEGIN
                        CREATE TABLE [dbo].[NewsletterSubscribers] (
                            [Id] INT IDENTITY(1,1) PRIMARY KEY,
                            [Email] NVARCHAR(255) NOT NULL,
                            [SubscribedAt] DATETIME NOT NULL,
                            [IsActive] BIT NOT NULL DEFAULT 1
                        );
                    END
                ");
            }
            else
            {
                db.Execute(@"
                    CREATE TABLE IF NOT EXISTS [ContactSubmissions] (
                        [Id] INTEGER PRIMARY KEY AUTOINCREMENT,
                        [Name] TEXT NOT NULL,
                        [Email] TEXT NOT NULL,
                        [Company] TEXT NULL,
                        [Message] TEXT NOT NULL,
                        [CreatedAt] DATETIME NOT NULL,
                        [IsRead] INTEGER NOT NULL DEFAULT 0
                    );

                    CREATE TABLE IF NOT EXISTS [NewsletterSubscribers] (
                        [Id] INTEGER PRIMARY KEY AUTOINCREMENT,
                        [Email] TEXT NOT NULL,
                        [SubscribedAt] DATETIME NOT NULL,
                        [IsActive] INTEGER NOT NULL DEFAULT 1
                    );
                ");
            }

            scope.Complete();
            _logger.LogInformation("Forms database tables verified and ensured successfully.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error ensuring forms database tables.");
        }

        return Task.CompletedTask;
    }

    public Task<int> SaveContactSubmissionAsync(ContactSubmission submission)
    {
        using var scope = _scopeProvider.CreateScope();
        submission.CreatedAt = DateTime.UtcNow;
        submission.IsRead = false;
        var id = Convert.ToInt32(scope.Database.Insert(submission));
        scope.Complete();
        _logger.LogInformation("Saved new contact submission with ID {Id} from {Email}", id, submission.Email);
        return Task.FromResult(id);
    }

    public Task<IEnumerable<ContactSubmission>> GetAllContactSubmissionsAsync()
    {
        using var scope = _scopeProvider.CreateScope();
        var items = scope.Database.Fetch<ContactSubmission>("ORDER BY CreatedAt DESC");
        scope.Complete();
        return Task.FromResult<IEnumerable<ContactSubmission>>(items);
    }

    public Task<bool> ToggleContactReadAsync(int id)
    {
        using var scope = _scopeProvider.CreateScope();
        var item = scope.Database.SingleOrDefaultById<ContactSubmission>(id);
        if (item == null)
        {
            scope.Complete();
            return Task.FromResult(false);
        }

        item.IsRead = !item.IsRead;
        scope.Database.Update(item);
        scope.Complete();
        return Task.FromResult(true);
    }

    public Task<bool> DeleteContactSubmissionAsync(int id)
    {
        using var scope = _scopeProvider.CreateScope();
        var rows = scope.Database.Delete<ContactSubmission>(id);
        scope.Complete();
        return Task.FromResult(rows > 0);
    }

    public Task<bool> SaveNewsletterSubscriberAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return Task.FromResult(false);
        var cleanEmail = email.Trim().ToLowerInvariant();

        using var scope = _scopeProvider.CreateScope();
        var existing = scope.Database.SingleOrDefault<NewsletterSubscriber>("WHERE LOWER(Email) = @0", cleanEmail);
        if (existing != null)
        {
            if (!existing.IsActive)
            {
                existing.IsActive = true;
                scope.Database.Update(existing);
            }
        }
        else
        {
            var newSub = new NewsletterSubscriber
            {
                Email = cleanEmail,
                SubscribedAt = DateTime.UtcNow,
                IsActive = true
            };
            scope.Database.Insert(newSub);
        }
        scope.Complete();
        _logger.LogInformation("Processed newsletter subscription for {Email}", cleanEmail);
        return Task.FromResult(true);
    }

    public Task<IEnumerable<NewsletterSubscriber>> GetAllNewsletterSubscribersAsync()
    {
        using var scope = _scopeProvider.CreateScope();
        var items = scope.Database.Fetch<NewsletterSubscriber>("ORDER BY SubscribedAt DESC");
        scope.Complete();
        return Task.FromResult<IEnumerable<NewsletterSubscriber>>(items);
    }

    public async Task<string> ExportNewsletterSubscribersCsvAsync()
    {
        var items = await GetAllNewsletterSubscribersAsync();
        var sb = new StringBuilder();
        sb.AppendLine("Email;SubscribedAt;IsActive");
        foreach (var sub in items)
        {
            sb.AppendLine($"\"{sub.Email}\";\"{sub.SubscribedAt:yyyy-MM-dd HH:mm:ss}\";\"{sub.IsActive}\"");
        }
        return sb.ToString();
    }
}
