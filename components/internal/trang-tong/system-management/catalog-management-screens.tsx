"use client";

import {
  Activity,
  Eye,
  Hospital as HospitalIcon,
  PackageSearch,
  Pencil,
  RotateCcw,
  Search,
  ShieldCheck,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import {
  DetailGrid,
  DetailItem,
  MetricCard,
  MetricGrid,
  PortalPageHeader,
  PortalSection,
  PortalTable,
  StatusPill,
} from "@/components/internal/portal-ui";
import { SafeMarkdown } from "@/components/shared/safe-markdown";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockDepartments } from "@/data/mocks/departments";
import { mockHospitals } from "@/data/mocks/hospitals";
import { mockMedicalServices } from "@/data/mocks/medical-services";
import { mockMedicines } from "@/data/mocks/medicines";
import {
  BaseStatus,
  MedicineUnit,
} from "@/types/models";

type ManagedRecord = {
  Uuid: string;
  Name: string;
  Status: BaseStatus;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

type CatalogConfig<T extends ManagedRecord> = {
  eyebrow: string;
  title: string;
  description: string;
  singular: string;
  icon: ReactNode;
  initialItems: T[];
  columns: string[];
  searchText: (item: T) => string;
  renderCells: (item: T) => ReactNode[];
  renderDetail: (item: T) => ReactNode;
  renderForm: (item: T, update: <K extends keyof T>(key: K, value: T[K]) => void) => ReactNode;
};

const dateFormatter = new Intl.DateTimeFormat("vi-VN");
const moneyFormatter = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

function isDeleted(item: ManagedRecord) {
  return item.DeletedAt.getTime() > 0;
}

function statusLabel(status: BaseStatus) {
  return status === BaseStatus.Active ? "Hoạt động" : "Tạm ngưng";
}

function RecordStatus({ item }: { item: ManagedRecord }) {
  if (isDeleted(item)) return <StatusPill tone="red">Đã xóa</StatusPill>;
  return <StatusPill tone={item.Status === BaseStatus.Active ? "green" : "amber"}>{statusLabel(item.Status)}</StatusPill>;
}

function CatalogManagementScreen<T extends ManagedRecord>({ config }: { config: CatalogConfig<T> }) {
  const [items, setItems] = useState<T[]>(() => config.initialItems.map((item) => ({ ...item })));
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [visibility, setVisibility] = useState("current");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [draft, setDraft] = useState<T | null>(null);

  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const filteredItems = items.filter((item) => {
    const matchesQuery = !normalizedQuery || config.searchText(item).toLocaleLowerCase("vi").includes(normalizedQuery);
    const matchesStatus = status === "all" || item.Status === status;
    const matchesVisibility = visibility === "all" || (visibility === "deleted" ? isDeleted(item) : !isDeleted(item));
    return matchesQuery && matchesStatus && matchesVisibility;
  });
  const detailItem = items.find((item) => item.Uuid === detailId) ?? null;
  const activeCount = items.filter((item) => !isDeleted(item) && item.Status === BaseStatus.Active).length;
  const deletedCount = items.filter(isDeleted).length;
  const insuredCount = items.filter((item) => "IsInsured" in item && item.IsInsured).length;

  function updateDraft<K extends keyof T>(key: K, value: T[K]) {
    setDraft((current) => current ? { ...current, [key]: value } : current);
  }

  function saveDraft() {
    if (!draft) return;
    setItems((current) => current.map((item) => item.Uuid === draft.Uuid ? { ...draft, UpdatedAt: new Date() } : item));
    setDraft(null);
  }

  function toggleDeleted(item: T) {
    const deletedAt = isDeleted(item) ? new Date(0) : new Date();
    setItems((current) => current.map((candidate) => candidate.Uuid === item.Uuid
      ? { ...candidate, DeletedAt: deletedAt, UpdatedAt: new Date() }
      : candidate));
  }

  const rows = filteredItems.map((item) => [
    ...config.renderCells(item),
    <RecordStatus key={`${item.Uuid}-status`} item={item} />,
    <div key={`${item.Uuid}-actions`} className="flex items-center justify-end gap-1">
      <Button type="button" variant="ghost" size="icon-sm" title="Xem chi tiết" aria-label={`Xem chi tiết ${item.Name}`} onClick={() => setDetailId(item.Uuid)}>
        <Eye />
      </Button>
      <Button type="button" variant="ghost" size="icon-sm" title="Chỉnh sửa" aria-label={`Chỉnh sửa ${item.Name}`} onClick={() => setDraft({ ...item })}>
        <Pencil />
      </Button>
      <Button type="button" variant={isDeleted(item) ? "outline" : "destructive"} size="icon-sm" title={isDeleted(item) ? "Khôi phục" : "Xóa"} aria-label={`${isDeleted(item) ? "Khôi phục" : "Xóa"} ${item.Name}`} onClick={() => toggleDeleted(item)}>
        {isDeleted(item) ? <RotateCcw /> : <Trash2 />}
      </Button>
    </div>,
  ]);

  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow={config.eyebrow} title={config.title} description={config.description} />
      <MetricGrid>
        <MetricCard label="Tổng bản ghi" value={String(items.length)} detail={`${items.length - deletedCount} bản ghi hiện hành`} icon={config.icon} />
        <MetricCard label="Đang hoạt động" value={String(activeCount)} detail="Không bao gồm bản ghi đã xóa" icon={<Activity className="size-5" />} tone="green" />
        <MetricCard label="Đã xóa" value={String(deletedCount)} detail="Có thể khôi phục bất kỳ lúc nào" icon={<Trash2 className="size-5" />} tone="red" />
        <MetricCard label={"IsInsured" in (items[0] ?? {}) ? "Có bảo hiểm" : "Cập nhật gần đây"} value={"IsInsured" in (items[0] ?? {}) ? String(insuredCount) : String(items.filter((item) => item.UpdatedAt >= new Date("2026-08-14")).length)} detail={"IsInsured" in (items[0] ?? {}) ? "Theo cấu hình danh mục" : "Từ 14/08/2026"} icon={<ShieldCheck className="size-5" />} tone="cyan" />
      </MetricGrid>

      <PortalSection title={`Danh sách ${config.title.toLocaleLowerCase("vi")}`} description={`${filteredItems.length} kết quả theo bộ lọc hiện tại`}>
        <div className="grid gap-3 border-b bg-[#fbfdfe] p-4 lg:grid-cols-[minmax(16rem,1fr)_12rem_12rem]">
          <label className="relative">
            <span className="sr-only">Tìm kiếm</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Tìm ${config.title.toLocaleLowerCase("vi")}...`} className="pl-9" />
          </label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-md border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" aria-label="Lọc trạng thái">
            <option value="all">Tất cả trạng thái</option>
            <option value={BaseStatus.Active}>Hoạt động</option>
            <option value={BaseStatus.InActive}>Tạm ngưng</option>
          </select>
          <select value={visibility} onChange={(event) => setVisibility(event.target.value)} className="h-10 rounded-md border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" aria-label="Lọc trạng thái xóa">
            <option value="current">Bản ghi hiện hành</option>
            <option value="deleted">Đã xóa</option>
            <option value="all">Tất cả bản ghi</option>
          </select>
        </div>
        {rows.length ? (
          <PortalTable caption={`Danh sách ${config.title.toLocaleLowerCase("vi")}`} columns={[...config.columns, "Trạng thái", "Thao tác"]} rows={rows} />
        ) : (
          <div className="p-10 text-center text-sm text-muted-foreground">Không có bản ghi phù hợp với bộ lọc.</div>
        )}
      </PortalSection>

      <Dialog open={Boolean(detailItem)} onOpenChange={(open) => { if (!open) setDetailId(null); }}>
        <DialogContent className="max-w-3xl">
          {detailItem ? (
            <>
              <DialogHeader>
                <DialogTitle>{detailItem.Name}</DialogTitle>
                <DialogDescription>Chi tiết {config.singular} và trạng thái dữ liệu hiện tại.</DialogDescription>
              </DialogHeader>
              <div className="mt-5 space-y-5">{config.renderDetail(detailItem)}</div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDetailId(null)}>Đóng</Button>
                <Button type="button" onClick={() => { setDraft({ ...detailItem }); setDetailId(null); }}><Pencil />Chỉnh sửa</Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(draft)} onOpenChange={(open) => { if (!open) setDraft(null); }}>
        <DialogContent className="max-w-4xl">
          {draft ? (
            <form onSubmit={(event) => { event.preventDefault(); saveDraft(); }}>
              <DialogHeader>
                <DialogTitle>Chỉnh sửa {config.singular}</DialogTitle>
                <DialogDescription>Thay đổi chỉ được lưu trong phiên làm việc hiện tại.</DialogDescription>
              </DialogHeader>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">{config.renderForm(draft, updateDraft)}</div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDraft(null)}>Hủy</Button>
                <Button type="submit">Lưu thay đổi</Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <div className={wide ? "space-y-2 sm:col-span-2" : "space-y-2"}><Label>{label}</Label>{children}</div>;
}

function StatusField({ value, onChange }: { value: BaseStatus; onChange: (value: BaseStatus) => void }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value as BaseStatus)} className="h-10 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15">
      <option value={BaseStatus.Active}>Hoạt động</option>
      <option value={BaseStatus.InActive}>Tạm ngưng</option>
    </select>
  );
}

function MarkdownField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [preview, setPreview] = useState(false);
  return (
    <Field label={label} wide>
      <div className="flex gap-1 border-b pb-2">
        <Button type="button" size="sm" variant={preview ? "ghost" : "secondary"} onClick={() => setPreview(false)}>Soạn thảo</Button>
        <Button type="button" size="sm" variant={preview ? "secondary" : "ghost"} onClick={() => setPreview(true)}>Xem trước</Button>
      </div>
      {preview ? <div className="min-h-36 rounded-md border bg-slate-50 p-4 text-sm"><SafeMarkdown content={value} /></div> : <Textarea value={value} onChange={(event) => onChange(event.target.value)} className="min-h-36 font-mono text-sm" placeholder="Hỗ trợ **in đậm**, danh sách và đoạn văn Markdown" />}
    </Field>
  );
}

function CommonDetail({ item, children }: { item: ManagedRecord; children: ReactNode }) {
  return (
    <>
      <DetailGrid>
        {children}
        <DetailItem label="Trạng thái" value={<RecordStatus item={item} />} />
        <DetailItem label="Ngày tạo" value={dateFormatter.format(item.CreatedAt)} />
        <DetailItem label="Cập nhật" value={dateFormatter.format(item.UpdatedAt)} />
        <DetailItem label="DeletedAt" value={isDeleted(item) ? dateFormatter.format(item.DeletedAt) : "Chưa xóa"} />
      </DetailGrid>
    </>
  );
}

function MarkdownDetail({ title, content }: { title: string; content: string }) {
  return <section className="rounded-lg border p-5"><h3 className="mb-3 font-semibold text-[#173b57]">{title}</h3><SafeMarkdown content={content} /></section>;
}

export function HospitalsManagementScreen() {
  return <CatalogManagementScreen config={{
    eyebrow: "Danh mục toàn hệ thống",
    title: "Cơ sở y tế",
    singular: "cơ sở y tế",
    description: "Quản lý đầy đủ thông tin vận hành, nội dung giới thiệu và vòng đời dữ liệu của các cơ sở.",
    icon: <HospitalIcon className="size-5" />,
    initialItems: mockHospitals,
    columns: ["Cơ sở", "Địa chỉ", "Số phòng", "Giờ làm việc", "Cập nhật"],
    searchText: (item) => `${item.Name} ${item.Slug} ${item.Address}`,
    renderCells: (item) => [
      <div key="name"><div className="font-semibold">{item.Name}</div><div className="mt-1 text-xs text-muted-foreground">/{item.Slug}</div></div>,
      <span key="address" className="block max-w-72 whitespace-normal">{item.Address}</span>,
      item.NumberOfRoom,
      item.WorkingHour,
      dateFormatter.format(item.UpdatedAt),
    ],
    renderDetail: (item) => <><CommonDetail item={item}><DetailItem label="Slug" value={item.Slug} /><DetailItem label="Địa chỉ" value={item.Address} /><DetailItem label="Số phòng" value={item.NumberOfRoom} /><DetailItem label="Giờ làm việc" value={item.WorkingHour} /><DetailItem label="Ảnh đại diện" value={item.Image} /><DetailItem label="Bản đồ" value={<a className="text-primary underline" href={item.MapUrl} target="_blank" rel="noreferrer">Mở Google Maps</a>} /></CommonDetail><MarkdownDetail title="Mô tả" content={item.Description} /><MarkdownDetail title="Chi tiết dịch vụ" content={item.DetailService} /></>,
    renderForm: (item, update) => <><Field label="Tên cơ sở"><Input required value={item.Name} onChange={(event) => update("Name", event.target.value)} /></Field><Field label="Slug"><Input required value={item.Slug} onChange={(event) => update("Slug", event.target.value)} /></Field><Field label="Địa chỉ" wide><Input required value={item.Address} onChange={(event) => update("Address", event.target.value)} /></Field><Field label="Số phòng"><Input required min={0} type="number" value={item.NumberOfRoom} onChange={(event) => update("NumberOfRoom", Number(event.target.value))} /></Field><Field label="Trạng thái"><StatusField value={item.Status} onChange={(value) => update("Status", value)} /></Field><Field label="Giờ làm việc" wide><Input value={item.WorkingHour} onChange={(event) => update("WorkingHour", event.target.value)} /></Field><Field label="URL bản đồ" wide><Input value={item.MapUrl} onChange={(event) => update("MapUrl", event.target.value)} /></Field><MarkdownField label="Mô tả (Markdown)" value={item.Description} onChange={(value) => update("Description", value)} /><MarkdownField label="Chi tiết dịch vụ (Markdown)" value={item.DetailService} onChange={(value) => update("DetailService", value)} /></>,
  }} />;
}

export function DepartmentsManagementScreen() {
  return <CatalogManagementScreen config={{
    eyebrow: "Danh mục chuyên môn",
    title: "Chuyên khoa",
    singular: "chuyên khoa",
    description: "Quản lý định danh, nội dung mô tả và trạng thái sử dụng của danh mục chuyên khoa gốc.",
    icon: <Stethoscope className="size-5" />,
    initialItems: mockDepartments,
    columns: ["Chuyên khoa", "Slug", "Mô tả", "Ngày tạo", "Cập nhật"],
    searchText: (item) => `${item.Name} ${item.Slug} ${item.Description}`,
    renderCells: (item) => [item.Name, item.Slug, <span key="description" className="block max-w-80 truncate">{item.Description}</span>, dateFormatter.format(item.CreatedAt), dateFormatter.format(item.UpdatedAt)],
    renderDetail: (item) => <><CommonDetail item={item}><DetailItem label="Slug" value={item.Slug} /><DetailItem label="Biểu tượng" value={item.Icon} /></CommonDetail><MarkdownDetail title="Mô tả chuyên khoa" content={item.Description} /></>,
    renderForm: (item, update) => <><Field label="Tên chuyên khoa"><Input required value={item.Name} onChange={(event) => update("Name", event.target.value)} /></Field><Field label="Slug"><Input required value={item.Slug} onChange={(event) => update("Slug", event.target.value)} /></Field><Field label="Đường dẫn biểu tượng"><Input value={item.Icon} onChange={(event) => update("Icon", event.target.value)} /></Field><Field label="Trạng thái"><StatusField value={item.Status} onChange={(value) => update("Status", value)} /></Field><MarkdownField label="Mô tả (Markdown)" value={item.Description} onChange={(value) => update("Description", value)} /></>,
  }} />;
}

export function MedicalServicesManagementScreen() {
  return <CatalogManagementScreen config={{
    eyebrow: "Danh mục chuyên môn",
    title: "Dịch vụ y tế",
    singular: "dịch vụ y tế",
    description: "Quản lý giá, quyền lợi bảo hiểm, lịch thực hiện và nội dung dịch vụ dùng chung.",
    icon: <Activity className="size-5" />,
    initialItems: mockMedicalServices,
    columns: ["Dịch vụ", "Giá", "Giờ thực hiện", "Bảo hiểm", "Nổi bật", "Cập nhật"],
    searchText: (item) => `${item.Name} ${item.Slug} ${item.Description} ${item.WorkingHour}`,
    renderCells: (item) => [<div key="name"><div className="font-semibold">{item.Name}</div><div className="mt-1 text-xs text-muted-foreground">/{item.Slug}</div></div>, moneyFormatter.format(item.Price), item.WorkingHour, item.IsInsured ? `${Math.round(item.InsuranceCap * 100)}%` : "Không", item.IsFeatured ? "Có" : "Không", dateFormatter.format(item.UpdatedAt)],
    renderDetail: (item) => <><CommonDetail item={item}><DetailItem label="Slug" value={item.Slug} /><DetailItem label="Giá tham chiếu" value={moneyFormatter.format(item.Price)} /><DetailItem label="Giờ thực hiện" value={item.WorkingHour} /><DetailItem label="Bảo hiểm" value={item.IsInsured ? `Có, tối đa ${Math.round(item.InsuranceCap * 100)}%` : "Không"} /><DetailItem label="Dịch vụ nổi bật" value={item.IsFeatured ? "Có" : "Không"} /><DetailItem label="Hình ảnh" value={item.Image} /></CommonDetail><MarkdownDetail title="Mô tả" content={item.Description} /><MarkdownDetail title="Chi tiết dịch vụ" content={item.DetailService} /></>,
    renderForm: (item, update) => <><Field label="Tên dịch vụ"><Input required value={item.Name} onChange={(event) => update("Name", event.target.value)} /></Field><Field label="Slug"><Input required value={item.Slug} onChange={(event) => update("Slug", event.target.value)} /></Field><Field label="Giá tham chiếu"><Input required min={0} type="number" value={item.Price} onChange={(event) => update("Price", Number(event.target.value))} /></Field><Field label="Giờ thực hiện"><Input value={item.WorkingHour} onChange={(event) => update("WorkingHour", event.target.value)} /></Field><Field label="Trạng thái"><StatusField value={item.Status} onChange={(value) => update("Status", value)} /></Field><Field label="Mức chi trả bảo hiểm (0-1)"><Input min={0} max={1} step={0.1} type="number" disabled={!item.IsInsured} value={item.InsuranceCap} onChange={(event) => update("InsuranceCap", Number(event.target.value))} /></Field><Field label="Tùy chọn" wide><div className="flex flex-wrap gap-6 rounded-md border p-3 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={item.IsInsured} onChange={(event) => update("IsInsured", event.target.checked)} />Áp dụng bảo hiểm</label><label className="flex items-center gap-2"><input type="checkbox" checked={item.IsFeatured} onChange={(event) => update("IsFeatured", event.target.checked)} />Dịch vụ nổi bật</label></div></Field><MarkdownField label="Mô tả (Markdown)" value={item.Description} onChange={(value) => update("Description", value)} /><MarkdownField label="Chi tiết dịch vụ (Markdown)" value={item.DetailService} onChange={(value) => update("DetailService", value)} /></>,
  }} />;
}

const medicineUnitLabels: Record<MedicineUnit, string> = {
  [MedicineUnit.Other]: "Khác",
  [MedicineUnit.Tablet]: "Viên",
  [MedicineUnit.Bottle]: "Chai",
  [MedicineUnit.Box]: "Hộp",
  [MedicineUnit.Tube]: "Tuýp",
  [MedicineUnit.Sachet]: "Gói",
};

export function MedicinesManagementScreen() {
  return <CatalogManagementScreen config={{
    eyebrow: "Danh mục dược",
    title: "Danh mục thuốc",
    singular: "thuốc",
    description: "Quản lý thuốc gốc từ Medicine model; tồn kho vẫn được theo dõi riêng tại từng chi nhánh.",
    icon: <PackageSearch className="size-5" />,
    initialItems: mockMedicines,
    columns: ["Thuốc", "Mô tả", "Đơn vị", "Đơn giá", "Bảo hiểm", "Cập nhật"],
    searchText: (item) => `${item.Name} ${item.Description} ${medicineUnitLabels[item.Unit]}`,
    renderCells: (item) => [item.Name, <span key="description" className="block max-w-72 whitespace-normal">{item.Description}</span>, medicineUnitLabels[item.Unit], moneyFormatter.format(item.Price), item.IsInsured ? `${Math.round(item.InsuranceCap * 100)}%` : "Không", dateFormatter.format(item.UpdatedAt)],
    renderDetail: (item) => <><CommonDetail item={item}><DetailItem label="Đơn vị" value={medicineUnitLabels[item.Unit]} /><DetailItem label="Đơn giá" value={moneyFormatter.format(item.Price)} /><DetailItem label="Bảo hiểm" value={item.IsInsured ? `Có, tối đa ${Math.round(item.InsuranceCap * 100)}%` : "Không"} /><DetailItem label="Hình ảnh" value={item.Image || "Chưa cập nhật"} /></CommonDetail><section className="rounded-lg border p-5"><h3 className="mb-2 font-semibold text-[#173b57]">Mô tả thuốc</h3><p className="text-sm leading-6 text-muted-foreground">{item.Description || "Đang cập nhật"}</p></section></>,
    renderForm: (item, update) => <><Field label="Tên thuốc"><Input required value={item.Name} onChange={(event) => update("Name", event.target.value)} /></Field><Field label="Đơn vị"><select value={item.Unit} onChange={(event) => update("Unit", event.target.value as MedicineUnit)} className="h-10 w-full rounded-md border bg-white px-3 text-sm">{Object.values(MedicineUnit).map((unit) => <option key={unit} value={unit}>{medicineUnitLabels[unit]}</option>)}</select></Field><Field label="Đơn giá"><Input required min={0} type="number" value={item.Price} onChange={(event) => update("Price", Number(event.target.value))} /></Field><Field label="Trạng thái"><StatusField value={item.Status} onChange={(value) => update("Status", value)} /></Field><Field label="Mức chi trả bảo hiểm (0-1)"><Input min={0} max={1} step={0.1} type="number" disabled={!item.IsInsured} value={item.InsuranceCap} onChange={(event) => update("InsuranceCap", Number(event.target.value))} /></Field><Field label="Bảo hiểm"><label className="flex h-10 items-center gap-2 rounded-md border px-3 text-sm"><input type="checkbox" checked={item.IsInsured} onChange={(event) => update("IsInsured", event.target.checked)} />Áp dụng bảo hiểm</label></Field><Field label="Mô tả" wide><Textarea value={item.Description} onChange={(event) => update("Description", event.target.value)} /></Field></>,
  }} />;
}
