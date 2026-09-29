using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class Provider : ISoftDeletable
{
    [Key]
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Hotline { get; set; } = string.Empty;
    public ProviderStatus Status { get; set; } = ProviderStatus.Active;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
