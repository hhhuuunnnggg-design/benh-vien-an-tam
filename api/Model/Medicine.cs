using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class Medicine : ISoftDeletable
{
    [Key]
    public Guid Uuid { get; set; }
    public string Image { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Price { get; set; }
    public MedicineUnit Unit { get; set; } = MedicineUnit.Other;
    public BaseStatus Status { get; set; } = BaseStatus.Active;
    public bool IsInsured { get; set; }
    public float InsuranceCap { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
