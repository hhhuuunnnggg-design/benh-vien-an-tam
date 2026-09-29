using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class AuditLog
{
    [Key]
    public Guid Uuid { get; set; }
}
