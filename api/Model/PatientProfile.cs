using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class PatientProfile
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid AccountUuid { get; set; }
    public string Avatar { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public Gender Gender { get; set; } = Gender.Other;
    public DateTime Birthdate { get; set; }
    public string MedicalCode { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
