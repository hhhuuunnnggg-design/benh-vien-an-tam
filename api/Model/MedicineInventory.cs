using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class MedicineInventory : ISoftDeletable
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid HospitalUuid { get; set; }
    public Guid MedicineUuid { get; set; }
    public int Quantity { get; set; }
    public int MinimumQuantity { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
