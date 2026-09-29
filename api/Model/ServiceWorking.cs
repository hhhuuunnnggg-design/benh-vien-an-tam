using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class ServiceWorking
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid ServiceUuid { get; set; }
    public Guid WorkingUuid { get; set; }
}
