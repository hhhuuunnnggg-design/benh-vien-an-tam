using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class HospitalWorking
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid HospitalUuid { get; set; }
    public Guid WorkingUuid { get; set; }
}
