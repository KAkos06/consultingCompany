using System.Net;
using System.Net.Mail;
using ExecutiveInsightUmbraco.Models.Forms;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ExecutiveInsightUmbraco.Services.Forms;

public class EmailNotificationService : IEmailNotificationService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailNotificationService> _logger;

    public EmailNotificationService(IConfiguration configuration, ILogger<EmailNotificationService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendContactNotificationAsync(ContactSubmission submission)
    {
        var host = _configuration["SMTP_HOST"] ?? _configuration["Smtp:Host"] ?? "smtp.office365.com";
        var portStr = _configuration["SMTP_PORT"] ?? _configuration["Smtp:Port"] ?? "587";
        var user = _configuration["SMTP_USER"] ?? _configuration["Smtp:User"] ?? string.Empty;
        var pass = _configuration["SMTP_PASS"] ?? _configuration["Smtp:Pass"] ?? string.Empty;
        var from = _configuration["SMTP_FROM"] ?? _configuration["Smtp:From"] ?? user;
        var to = _configuration["SMTP_TO"] ?? _configuration["Smtp:To"] ?? "akos.kiss.in@gmail.com";

        if (string.IsNullOrWhiteSpace(user) || string.IsNullOrWhiteSpace(pass))
        {
            _logger.LogInformation("SMTP credentials are not yet configured (waiting for domain setup). Form submission #{Id} saved to database without email dispatch.", submission.Id);
            return;
        }

        if (!int.TryParse(portStr, out var port))
        {
            port = 587;
        }

        try
        {
            using var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(user, pass),
                EnableSsl = true
            };

            var mail = new MailMessage
            {
                From = new MailAddress(from, "Executive Insight Weboldal"),
                Subject = $"Új kapcsolatfelvétel: {submission.Name}",
                IsBodyHtml = true,
                Body = $@"
                    <div style=""font-family: Arial, sans-serif; line-height: 1.6; color: #1A2A4F; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;"">
                        <h2 style=""color: #1A2A4F; border-bottom: 2px solid #F7A5A5; padding-bottom: 10px;"">Új üzenet érkezett a weboldalról</h2>
                        <p><strong>Név:</strong> {WebUtility.HtmlEncode(submission.Name)}</p>
                        <p><strong>E-mail:</strong> <a href=""mailto:{WebUtility.HtmlEncode(submission.Email)}"">{WebUtility.HtmlEncode(submission.Email)}</a></p>
                        <p><strong>Cég / Pozíció:</strong> {WebUtility.HtmlEncode(submission.Company ?? "-")}</p>
                        <p><strong>Időpont:</strong> {submission.CreatedAt:yyyy-MM-dd HH:mm:ss} UTC</p>
                        <hr style=""border: 0; border-top: 1px solid #eee; margin: 20px 0;"" />
                        <p><strong>Üzenet:</strong></p>
                        <div style=""background: #FFF2EF; padding: 15px; border-radius: 6px; white-space: pre-wrap;"">{WebUtility.HtmlEncode(submission.Message)}</div>
                        <br />
                        <small style=""color: #888;"">Ez az üzenet automatikusan generálódott a weboldal kapcsolatfelvételi űrlapjából.</small>
                    </div>
                "
            };

            mail.To.Add(to);
            if (!string.IsNullOrWhiteSpace(submission.Email))
            {
                mail.ReplyToList.Add(new MailAddress(submission.Email, submission.Name));
            }

            await client.SendMailAsync(mail);
            _logger.LogInformation("Contact notification email sent successfully for submission #{Id} to {To}", submission.Id, to);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact notification email for submission #{Id}", submission.Id);
        }
    }
}
