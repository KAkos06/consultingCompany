using NPoco;

namespace ExecutiveInsightUmbraco.Models.Forms;

[TableName("ContactSubmissions")]
[PrimaryKey("Id", AutoIncrement = true)]
public class ContactSubmission
{
    [Column("Id")]
    public int Id { get; set; }

    [Column("Name")]
    public string Name { get; set; } = string.Empty;

    [Column("Email")]
    public string Email { get; set; } = string.Empty;

    [Column("Company")]
    public string? Company { get; set; }

    [Column("Message")]
    public string Message { get; set; } = string.Empty;

    [Column("CreatedAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("IsRead")]
    public bool IsRead { get; set; } = false;
}
