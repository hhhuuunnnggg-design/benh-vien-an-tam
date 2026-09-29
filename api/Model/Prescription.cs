using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class Prescription : ISoftDeletable
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid PatientProfileUuid { get; set; }
    public Guid DoctorProfileUuid { get; set; }
    public Guid HospitalUuid { get; set; }
    public PrescriptionStatus Status { get; set; } = PrescriptionStatus.Unpaid;
    public string Note { get; set; } = string.Empty;
    public Guid? AppointmentUuid { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
