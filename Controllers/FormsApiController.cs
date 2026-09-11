using System.Net.Mail;
using System.Text;
using ExecutiveInsightUmbraco.Models.Forms;
using ExecutiveInsightUmbraco.Services.Forms;
using ExecutiveInsightUmbraco.Services.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.Common.Authorization;

namespace ExecutiveInsightUmbraco.Controllers;

[ApiController]
public class FormsApiController : ControllerBase
{
    private readonly IFormsService _formsService;
    private readonly IEmailNotificationService _emailService;
    private readonly ITurnstileService _turnstileService;
    private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
    private readonly ILogger<FormsApiController> _logger;

    public FormsApiController(
        IFormsService formsService,
        IEmailNotificationService emailService,
        ITurnstileService turnstileService,
        IBackOfficeSecurityAccessor backOfficeSecurityAccessor,
        ILogger<FormsApiController> logger)
    {
        _formsService = formsService;
        _emailService = emailService;
        _turnstileService = turnstileService;
        _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
        _logger = logger;
    }

    // ==========================================
    // Public Endpoints (Website visitors)
    // ==========================================

    [HttpPost("api/forms/contact")]
    public async Task<IActionResult> SubmitContact([FromBody] ContactSubmissionDto dto)
    {
        if (dto == null)
        {
            return BadRequest(new { success = false, message = "Érvénytelen kérés." });
        }

        var remoteIp = HttpContext.Connection.RemoteIpAddress?.ToString();
        var isTurnstileValid = await _turnstileService.VerifyTokenAsync(dto.TurnstileToken, remoteIp);
        if (!isTurnstileValid)
        {
            return BadRequest(new { success = false, message = "A biztonsági ellenőrzés nem sikerült (bot gyanú). Kérjük, próbálja újra." });
        }

        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            return BadRequest(new { success = false, message = "A név megadása kötelező." });
        }

        if (string.IsNullOrWhiteSpace(dto.Email) || !IsValidEmail(dto.Email))
        {
            return BadRequest(new { success = false, message = "Kérjük, adjon meg érvényes e-mail címet." });
        }

        if (string.IsNullOrWhiteSpace(dto.Message))
        {
            return BadRequest(new { success = false, message = "Az üzenet szövegének megadása kötelező." });
        }

        var entity = new ContactSubmission
        {
            Name = dto.Name.Trim(),
            Email = dto.Email.Trim(),
            Company = dto.Company?.Trim(),
            Message = dto.Message.Trim()
        };

        var id = await _formsService.SaveContactSubmissionAsync(entity);
        entity.Id = id;

        // Asynchronous email notification (runs in background so visitor response is instantaneous)
        _ = Task.Run(async () =>
        {
            try
            {
                await _emailService.SendContactNotificationAsync(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send background email for submission #{Id}", id);
            }
        });

        return Ok(new { success = true, message = "Köszönjük megkeresését! Hamarosan felvesszük Önnel a kapcsolatot." });
    }

    [HttpPost("api/forms/newsletter")]
    public async Task<IActionResult> SubmitNewsletter([FromBody] NewsletterDto dto)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.Email) || !IsValidEmail(dto.Email))
        {
            return BadRequest(new { success = false, message = "Kérjük, adjon meg érvényes e-mail címet." });
        }

        var remoteIp = HttpContext.Connection.RemoteIpAddress?.ToString();
        var isTurnstileValid = await _turnstileService.VerifyTokenAsync(dto.TurnstileToken, remoteIp);
        if (!isTurnstileValid)
        {
            return BadRequest(new { success = false, message = "A biztonsági ellenőrzés nem sikerült (bot gyanú). Kérjük, próbálja újra." });
        }

        var result = await _formsService.SaveNewsletterSubscriberAsync(dto.Email);
        if (!result)
        {
            return BadRequest(new { success = false, message = "A feliratkozás sikertelen. Kérjük, próbálja újra később." });
        }

        return Ok(new { success = true, message = "Köszönjük! Sikeresen feliratkozott a hírlevelünkre." });
    }

    // ==========================================
    // Backoffice Management Endpoints
    // ==========================================

    [HttpGet("umbraco/api/submissions/contacts")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> GetContacts()
    {
        var items = await _formsService.GetAllContactSubmissionsAsync();
        return Ok(items);
    }

    [HttpPost("umbraco/api/submissions/contacts/{id:int}/toggle-read")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> ToggleRead(int id)
    {
        var updated = await _formsService.ToggleContactReadAsync(id);
        if (!updated) return NotFound(new { success = false, message = "A megkeresés nem található." });
        return Ok(new { success = true });
    }

    [HttpDelete("umbraco/api/submissions/contacts/{id:int}")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> DeleteContact(int id)
    {
        var deleted = await _formsService.DeleteContactSubmissionAsync(id);
        if (!deleted) return NotFound(new { success = false, message = "A megkeresés nem található." });
        return Ok(new { success = true });
    }

    [HttpGet("umbraco/api/submissions/newsletters")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> GetNewsletters()
    {
        var items = await _formsService.GetAllNewsletterSubscribersAsync();
        return Ok(items);
    }

    [HttpGet("umbraco/api/submissions/newsletters/export")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public async Task<IActionResult> ExportNewsletters()
    {
        var csv = await _formsService.ExportNewsletterSubscribersCsvAsync();
        var bytes = Encoding.UTF8.GetBytes(csv);
        var preamble = Encoding.UTF8.GetPreamble();
        var fullBytes = new byte[preamble.Length + bytes.Length];
        Buffer.BlockCopy(preamble, 0, fullBytes, 0, preamble.Length);
        Buffer.BlockCopy(bytes, 0, fullBytes, preamble.Length, bytes.Length);

        return File(fullBytes, "text/csv; charset=utf-8", $"hirlevel_feliratkozok_{DateTime.UtcNow:yyyyMMdd}.csv");
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new MailAddress(email.Trim());
            return addr.Address == email.Trim();
        }
        catch
        {
            return false;
        }
    }
}

public class ContactSubmissionDto
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Company { get; set; }
    public string? Message { get; set; }
    public string? TurnstileToken { get; set; }
}

public class NewsletterDto
{
    public string? Email { get; set; }
    public string? TurnstileToken { get; set; }
}
