using NPoco;

namespace ExecutiveInsightUmbraco.Models.Forms;

[TableName("NewsletterSubscribers")]
[PrimaryKey("Id", AutoIncrement = true)]
public class NewsletterSubscriber
{
    [Column("Id")]
    public int Id { get; set; }

    [Column("Email")]
    public string Email { get; set; } = string.Empty;

    [Column("SubscribedAt")]
    public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;

    [Column("IsActive")]
    public bool IsActive { get; set; } = true;
}
