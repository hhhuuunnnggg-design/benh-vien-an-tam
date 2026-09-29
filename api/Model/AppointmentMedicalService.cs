using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class AppointmentMedicalService
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid? AppointmentUuid { get; set; }
    public Guid? MedicalServiceUuid { get; set; }
    public int Price { get; set; }
}
