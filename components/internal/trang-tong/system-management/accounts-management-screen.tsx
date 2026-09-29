"use client";

import { Plus, RotateCcw, Search, ShieldAlert, Stethoscope, Trash2, UsersRound } from "lucide-react";
import { useState } from "react";

import {
  MetricCard,
  MetricGrid,
  PortalPageHeader,
  PortalSection,
  PortalTable,
  StatusPill,
} from "@/components/internal/portal-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAccounts } from "@/data/mocks/accounts";
import { mockHospitals } from "@/data/mocks/hospitals";
import { mockRoles } from "@/data/mocks/roles";
import { BaseStatus, type Account } from "@/types/models";

type RecordFilter = "active" | "deleted" | "all";

const dateTimeFormatter = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" });

function isDeleted(account: Account) {
  return account.DeletedAt.getTime() > 0;
}

export function AccountsManagementScreen() {
  const [accounts, setAccounts] = useState<Account[]>(() => mockAccounts.map((account) => ({ ...account })));
  const [query, setQuery] = useState("");
  const [roleUuid, setRoleUuid] = useState("all");
  const [status, setStatus] = useState("all");
  const [recordFilter, setRecordFilter] = useState<RecordFilter>("active");
  const [message, setMessage] = useState("");

  const activeAccounts = accounts.filter((account) => !isDeleted(account));
  const deletedAccounts = accounts.filter(isDeleted);
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const filteredAccounts = accounts.filter((account) => {
    const role = mockRoles.find((item) => item.Uuid === account.RoleUuid);
    const hospital = mockHospitals.find((item) => item.Uuid === account.HospitalUuid);
    const searchText = `${account.Phone} ${account.Uuid} ${role?.Name ?? ""} ${hospital?.Name ?? "Toàn hệ thống"}`.toLocaleLowerCase("vi");
    const matchesRecord = recordFilter === "all" || (recordFilter === "deleted" ? isDeleted(account) : !isDeleted(account));

    return (!normalizedQuery || searchText.includes(normalizedQuery))
      && (roleUuid === "all" || account.RoleUuid === roleUuid)
      && (status === "all" || account.Status === status)
      && matchesRecord;
  });

  function updateDeletedAt(account: Account, deleted: boolean) {
    const now = new Date();
    setAccounts((current) => current.map((item) => item.Uuid === account.Uuid
      ? { ...item, DeletedAt: deleted ? now : new Date(0), UpdatedAt: now }
      : item));
    setMessage(deleted
      ? `Đã xóa tài khoản ${account.Phone}. Dữ liệu vẫn được giữ để khôi phục.`
      : `Đã khôi phục tài khoản ${account.Phone}.`);
  }

  const rows = filteredAccounts.map((account) => {
    const role = mockRoles.find((item) => item.Uuid === account.RoleUuid);
    const hospital = mockHospitals.find((item) => item.Uuid === account.HospitalUuid);
    const deleted = isDeleted(account);

    return [
      <div key={`${account.Uuid}-identity`}>
        <p>{account.Phone}</p>
        <p className="mt-1 font-mono text-xs font-normal text-muted-foreground">{account.Uuid.slice(0, 8)}</p>
      </div>,
      <StatusPill key={`${account.Uuid}-role`} tone={role?.IsDoctor ? "blue" : "purple"}>{role?.Name ?? "Chưa gán role"}</StatusPill>,
      hospital?.Name ?? "Toàn hệ thống",
      <StatusPill key={`${account.Uuid}-status`} tone={account.Status === BaseStatus.Active ? "green" : "amber"}>{account.Status === BaseStatus.Active ? "Hoạt động" : "Vô hiệu hóa"}</StatusPill>,
      <div key={`${account.Uuid}-record`}>
        <StatusPill tone={deleted ? "red" : "green"}>{deleted ? "Đã xóa" : "Đang quản lý"}</StatusPill>
        {deleted ? <p className="mt-1 text-xs text-muted-foreground">{dateTimeFormatter.format(account.DeletedAt)}</p> : null}
      </div>,
      dateTimeFormatter.format(account.UpdatedAt),
      <Button key={`${account.Uuid}-action`} type="button" size="sm" variant={deleted ? "outline" : "destructive"} onClick={() => updateDeletedAt(account, !deleted)}>
        {deleted ? <RotateCcw /> : <Trash2 />}{deleted ? "Khôi phục" : "Xóa"}
      </Button>,
    ];
  });

  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Kiểm soát truy cập" title="Tài khoản hệ thống" description="Quản lý trạng thái, role, chi nhánh và vòng đời dữ liệu của tài khoản nhân sự." actions={<Button type="button" size="sm"><Plus />Tạo tài khoản</Button>} />
      <MetricGrid>
        <MetricCard label="Đang quản lý" value={String(activeAccounts.length)} detail={`${activeAccounts.filter((item) => item.Status === BaseStatus.Active).length} tài khoản hoạt động`} icon={<UsersRound className="size-5" />} />
        <MetricCard label="Role đang dùng" value={String(new Set(activeAccounts.map((item) => item.RoleUuid)).size)} detail={`${mockRoles.length} role đã cấu hình`} icon={<ShieldAlert className="size-5" />} tone="cyan" />
        <MetricCard label="Bác sĩ" value={String(activeAccounts.filter((item) => mockRoles.find((role) => role.Uuid === item.RoleUuid)?.IsDoctor).length)} detail="Chỉ tính bản ghi chưa xóa" icon={<Stethoscope className="size-5" />} tone="green" />
        <MetricCard label="Đã xóa" value={String(deletedAccounts.length)} detail="Có thể khôi phục bất kỳ lúc nào" icon={<Trash2 className="size-5" />} tone="red" />
      </MetricGrid>
      {message ? <p role="status" className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}
      <PortalSection title="Danh sách tài khoản" description={`${filteredAccounts.length} kết quả theo bộ lọc hiện tại`}>
        <div className="border-b bg-[#fbfdfe] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1 lg:max-w-sm">
              <span className="sr-only">Tìm tài khoản</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm số điện thoại, mã hoặc cơ sở" className="h-9 pl-9" />
            </label>
            <select aria-label="Lọc theo role" value={roleUuid} onChange={(event) => setRoleUuid(event.target.value)} className="h-9 rounded-md border bg-white px-3 text-sm">
              <option value="all">Tất cả role</option>
              {mockRoles.map((role) => <option key={role.Uuid} value={role.Uuid}>{role.Name}</option>)}
            </select>
            <select aria-label="Lọc theo trạng thái tài khoản" value={status} onChange={(event) => setStatus(event.target.value)} className="h-9 rounded-md border bg-white px-3 text-sm">
              <option value="all">Mọi trạng thái</option>
              <option value={BaseStatus.Active}>Hoạt động</option>
              <option value={BaseStatus.InActive}>Vô hiệu hóa</option>
            </select>
          </div>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Lọc vòng đời bản ghi">
            {([
              ["active", `Đang quản lý (${activeAccounts.length})`],
              ["deleted", `Đã xóa (${deletedAccounts.length})`],
              ["all", `Tất cả (${accounts.length})`],
            ] as const).map(([value, label]) => (
              <Button key={value} type="button" size="sm" variant={recordFilter === value ? "default" : "outline"} aria-pressed={recordFilter === value} onClick={() => setRecordFilter(value)}>{label}</Button>
            ))}
          </div>
        </div>
        {rows.length > 0 ? (
          <PortalTable caption="Danh sách tài khoản hệ thống" columns={["Tài khoản", "Role", "Chi nhánh", "Trạng thái", "Bản ghi", "Cập nhật", "Thao tác"]} rows={rows} />
        ) : (
          <p className="p-8 text-center text-sm text-muted-foreground">Không có tài khoản phù hợp với bộ lọc.</p>
        )}
      </PortalSection>
    </div>
  );
}
