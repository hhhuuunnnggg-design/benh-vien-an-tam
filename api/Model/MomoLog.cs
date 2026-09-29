using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class MomoLog
{
    [Key]
    public Guid Uuid { get; set; }
}
