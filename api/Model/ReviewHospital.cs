using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class ReviewHospital
{
    [Key]
    public Guid Uuid { get; set; }
    public string Content { get; set; } = string.Empty;
    public int NumberOfStar { get; set; }
    public Guid? PatientUuid { get; set; }
    public Guid? HospitalUuid { get; set; }
    public BaseStatus Status { get; set; } = BaseStatus.Active;
    public bool IsViewed { get; set; }
    public DateTime CreatedAt { get; set; }
}
