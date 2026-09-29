using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class Room : ISoftDeletable
{
    [Key]
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public RoomStatus Status { get; set; } = RoomStatus.Available;

    public Guid HospitalUuid { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
