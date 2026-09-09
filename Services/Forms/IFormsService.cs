using ExecutiveInsightUmbraco.Models.Forms;

namespace ExecutiveInsightUmbraco.Services.Forms;

public interface IFormsService
{
    Task EnsureDatabaseTablesAsync();
    Task<int> SaveContactSubmissionAsync(ContactSubmission submission);
    Task<IEnumerable<ContactSubmission>> GetAllContactSubmissionsAsync();
    Task<bool> ToggleContactReadAsync(int id);
    Task<bool> DeleteContactSubmissionAsync(int id);
    Task<bool> SaveNewsletterSubscriberAsync(string email);
    Task<IEnumerable<NewsletterSubscriber>> GetAllNewsletterSubscribersAsync();
    Task<string> ExportNewsletterSubscribersCsvAsync();
}
