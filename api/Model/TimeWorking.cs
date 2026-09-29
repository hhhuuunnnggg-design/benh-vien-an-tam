using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class TimeWorking : ISoftDeletable
{
    [Key]
    public Guid Uuid { get; set; }
    public int DayOfWeek { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public BaseStatus Status { get; set; } = BaseStatus.Active;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
