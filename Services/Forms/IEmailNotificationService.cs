using ExecutiveInsightUmbraco.Models.Forms;

namespace ExecutiveInsightUmbraco.Services.Forms;

public interface IEmailNotificationService
{
    Task SendContactNotificationAsync(ContactSubmission submission);
}
