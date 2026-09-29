import { mockPermissions } from "@/data/mocks/permissions";
import { PermissionAction, ROLE_UUIDS, type RolePermission } from "@/types/models";

const actions = Object.values(PermissionAction);

export const mockRolePermissions: RolePermission[] = mockPermissions.flatMap((permission, permissionIndex) =>
  actions.map((Action, actionIndex) => ({
    Uuid: `21000000-${String(permissionIndex + 1).padStart(4, "0")}-4000-8000-${String(actionIndex + 1).padStart(12, "0")}`,
    RoleUuid: ROLE_UUIDS.SYSTEM_ADMIN,
    PermissionUuid: permission.Uuid,
    Action,
  })),
);
