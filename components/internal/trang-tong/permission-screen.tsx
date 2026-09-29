"use client";

import { KeyRound, Plus, RotateCcw, Search, ShieldCheck, Trash2, UsersRound } from "lucide-react";
import { useState } from "react";

import { PortalPageHeader, PortalSection, PortalTable, StatusPill } from "@/components/internal/portal-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAccounts } from "@/data/mocks/accounts";
import { mockPermissions } from "@/data/mocks/permissions";
import { mockRolePermissions } from "@/data/mocks/role-permissions";
import { mockRoles } from "@/data/mocks/roles";
import { BaseStatus, PermissionAction, type Role } from "@/types/models";

type RecordFilter = "active" | "deleted" | "all";

const actions = Object.values(PermissionAction);
const dateFormatter = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" });

function isDeleted(role: Role) {
  return role.DeletedAt.getTime() > 0;
}

function permissionKey(permissionUuid: string, action: PermissionAction) {
  return `${permissionUuid}:${action}`;
}

export function PermissionManagementScreen() {
  const [roles, setRoles] = useState<Role[]>(() => mockRoles.map((role) => ({ ...role })));
  const [selectedRoleUuid, setSelectedRoleUuid] = useState(mockRoles[0]?.Uuid ?? "");
  const [query, setQuery] = useState("");
  const [recordFilter, setRecordFilter] = useState<RecordFilter>("active");
  const [message, setMessage] = useState("");
  const [rolePermissions, setRolePermissions] = useState<Record<string, Set<string>>>(() => ({
    [mockRoles[0]?.Uuid ?? ""]: new Set(mockRolePermissions.map((item) => permissionKey(item.PermissionUuid, item.Action))),
  }));

  const activeRoles = roles.filter((role) => !isDeleted(role));
  const deletedRoles = roles.filter(isDeleted);
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const filteredRoles = roles.filter((role) => {
    const matchesQuery = !normalizedQuery || `${role.Name} ${role.Description} ${role.Uuid}`.toLocaleLowerCase("vi").includes(normalizedQuery);
    const matchesRecord = recordFilter === "all" || (recordFilter === "deleted" ? isDeleted(role) : !isDeleted(role));
    return matchesQuery && matchesRecord;
  });
  const selectedRole = roles.find((role) => role.Uuid === selectedRoleUuid) ?? roles[0];
  const selectedPermissions = rolePermissions[selectedRole?.Uuid ?? ""] ?? new Set<string>();

  function updateDeletedAt(role: Role, deleted: boolean) {
    const now = new Date();
    setRoles((current) => current.map((item) => item.Uuid === role.Uuid
      ? { ...item, DeletedAt: deleted ? now : new Date(0), UpdatedAt: now }
      : item));
    setMessage(deleted
      ? `Đã xóa role ${role.Name}. Các cấu hình quyền vẫn được giữ lại.`
      : `Đã khôi phục role ${role.Name}.`);
  }

  function togglePermission(permissionUuid: string, action: PermissionAction) {
    if (!selectedRole || isDeleted(selectedRole)) return;
    const key = permissionKey(permissionUuid, action);
    setRolePermissions((current) => {
      const next = new Set(current[selectedRole.Uuid] ?? []);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return { ...current, [selectedRole.Uuid]: next };
    });
    setMessage("");
  }

  const rows = filteredRoles.map((role) => {
    const deleted = isDeleted(role);
    const accountCount = mockAccounts.filter((account) => account.RoleUuid === role.Uuid && account.DeletedAt.getTime() === 0).length;
    return [
      <button key={`${role.Uuid}-name`} type="button" onClick={() => setSelectedRoleUuid(role.Uuid)} className="text-left text-primary hover:underline">
        <span className="block font-semibold">{role.Name}</span>
        <span className="mt-1 block max-w-sm whitespace-normal text-xs font-normal text-muted-foreground">{role.Description}</span>
      </button>,
      <StatusPill key={`${role.Uuid}-type`} tone={role.IsDoctor ? "blue" : "purple"}>{role.IsDoctor ? "Role bác sĩ" : "Role nghiệp vụ"}</StatusPill>,
      <span key={`${role.Uuid}-accounts`} className="inline-flex items-center gap-1.5"><UsersRound className="size-4 text-muted-foreground" />{accountCount}</span>,
      <StatusPill key={`${role.Uuid}-status`} tone={role.Status === BaseStatus.Active ? "green" : "amber"}>{role.Status === BaseStatus.Active ? "Hoạt động" : "Tạm ngưng"}</StatusPill>,
      <div key={`${role.Uuid}-record`}>
        <StatusPill tone={deleted ? "red" : "green"}>{deleted ? "Đã xóa" : "Đang quản lý"}</StatusPill>
        {deleted ? <p className="mt-1 text-xs text-muted-foreground">{dateFormatter.format(role.DeletedAt)}</p> : null}
      </div>,
      dateFormatter.format(role.UpdatedAt),
      <div key={`${role.Uuid}-actions`} className="flex gap-2">
        <Button type="button" size="sm" variant="outline" onClick={() => setSelectedRoleUuid(role.Uuid)}>Phân quyền</Button>
        <Button type="button" size="sm" variant={deleted ? "outline" : "destructive"} onClick={() => updateDeletedAt(role, !deleted)}>
          {deleted ? <RotateCcw /> : <Trash2 />}{deleted ? "Khôi phục" : "Xóa"}
        </Button>
      </div>,
    ];
  });

  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Kiểm soát truy cập linh động" title="Vai trò và quyền hạn" description="Quản lý vòng đời role và gán các thao tác trên toàn bộ chức năng đang có trong cổng nội bộ." actions={<Button type="button" size="sm"><Plus />Tạo role</Button>} />
      {message ? <p role="status" className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}
      <PortalSection title="Danh sách role" description={`${activeRoles.length} đang quản lý, ${deletedRoles.length} đã xóa`}>
        <div className="border-b bg-[#fbfdfe] p-4">
          <label className="relative block max-w-sm">
            <span className="sr-only">Tìm role</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm tên, mô tả hoặc mã role" className="h-9 pl-9" />
          </label>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Lọc vòng đời role">
            {([
              ["active", `Đang quản lý (${activeRoles.length})`],
              ["deleted", `Đã xóa (${deletedRoles.length})`],
              ["all", `Tất cả (${roles.length})`],
            ] as const).map(([value, label]) => (
              <Button key={value} type="button" size="sm" variant={recordFilter === value ? "default" : "outline"} aria-pressed={recordFilter === value} onClick={() => setRecordFilter(value)}>{label}</Button>
            ))}
          </div>
        </div>
        {rows.length > 0 ? (
          <PortalTable caption="Danh sách role hệ thống" columns={["Role", "Phân loại", "Tài khoản", "Trạng thái", "Bản ghi", "Cập nhật", "Thao tác"]} rows={rows} />
        ) : (
          <p className="p-8 text-center text-sm text-muted-foreground">Không có role phù hợp với bộ lọc.</p>
        )}
      </PortalSection>
      {selectedRole ? (
        <PortalSection
          title={`Permission của ${selectedRole.Name}`}
          description={`${selectedPermissions.size} thao tác đang được cấp trên ${mockPermissions.length} chức năng`}
          action={<StatusPill tone={isDeleted(selectedRole) ? "red" : "green"}>{isDeleted(selectedRole) ? "Role đã xóa" : "Đang hoạt động"}</StatusPill>}
        >
          {isDeleted(selectedRole) ? <p className="border-b bg-red-50 px-5 py-3 text-sm text-red-700">Khôi phục role để tiếp tục chỉnh sửa quyền. Cấu hình hiện tại vẫn được bảo lưu.</p> : null}
          <div className="grid gap-3 p-5 md:grid-cols-2 2xl:grid-cols-3">
            {mockPermissions.map((permission) => (
              <article key={permission.Uuid} className="border bg-white p-4">
                <div className="flex items-center gap-2"><KeyRound className="size-4 text-primary" /><strong className="text-sm">{permission.Name}</strong></div>
                <p className="mt-2 min-h-10 text-xs leading-5 text-muted-foreground">{permission.Description}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {actions.map((action) => (
                    <label key={action} className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedPermissions.has(permissionKey(permission.Uuid, action))} disabled={isDeleted(selectedRole)} onChange={() => togglePermission(permission.Uuid, action)} className="accent-primary" />
                      {action}
                    </label>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 border-t p-5">
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4" />Thay đổi được lưu trong trạng thái mock của phiên hiện tại.</span>
            <Button type="button" size="sm" disabled={isDeleted(selectedRole)} onClick={() => setMessage(`Đã lưu phân quyền cho ${selectedRole.Name}.`)}>Lưu phân quyền</Button>
          </div>
        </PortalSection>
      ) : null}
    </div>
  );
}
