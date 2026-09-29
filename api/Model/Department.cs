using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class Department 
{
    [Key]
    public Guid Uuid { get; set; }
    public string Icon { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public BaseStatus Status { get; set; } = BaseStatus.Active;

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
