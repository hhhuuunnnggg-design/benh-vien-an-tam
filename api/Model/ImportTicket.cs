using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class ImportTicket 
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid? HospitalUuid { get; set; }
    public Guid? AccountUuid { get; set; }
    public Guid? ProviderUuid { get; set; }
    public string Note { get; set; } = string.Empty;
    public ImportTicketStatus Status { get; set; } = ImportTicketStatus.Pending;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
