using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class ExportTicketDetail
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid ExportTicketUuid { get; set; }
    public Guid MedicineUuid { get; set; }
    public int Quantity { get; set; }
    public int Price { get; set; }
}
