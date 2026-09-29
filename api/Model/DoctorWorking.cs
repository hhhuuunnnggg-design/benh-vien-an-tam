using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class DoctorWorking
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid DoctorUuid { get; set; }
    public Guid WorkingUuid { get; set; }
}
