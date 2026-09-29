using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class MedicalService 
{
    [Key]
    public Guid Uuid { get; set; }
    public string Image { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public string DetailService { get; set; } = string.Empty;
    public string WorkingHour { get; set; } = string.Empty;
    public BaseStatus Status { get; set; } = BaseStatus.Active;
    public bool IsInsured { get; set; }
    public int InsuranceCap { get; set; }
    public bool IsFeatured { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
