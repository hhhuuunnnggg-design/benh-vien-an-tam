using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class HospitalMedicalService
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid? HospitalUuid { get; set; }
    public Guid? MedicalServiceUuid { get; set; }
}
