using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class PrescriptionDetail
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid PrescriptionUuid { get; set; }
    public Guid MedicineUuid { get; set; }
    public int Quantity { get; set; }
    public int QuantityPerDose { get; set; }
    public int DosesPerDay { get; set; }
    public int Duration { get; set; }
    public int Price { get; set; }
    public bool IsExternal { get; set; }
    public string Note { get; set; } = string.Empty;
}
