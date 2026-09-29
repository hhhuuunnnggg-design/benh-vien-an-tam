using System.ComponentModel.DataAnnotations;
using api.Model.Enum;

namespace api.Model;

public class RolePermission
{
    [Key]
    public Guid Uuid { get; set; }
    public Guid? RoleUuid { get; set; }
    public Guid? PermissionUuid { get; set; }
    public PermissionAction Action { get; set; } = PermissionAction.Read;
}
