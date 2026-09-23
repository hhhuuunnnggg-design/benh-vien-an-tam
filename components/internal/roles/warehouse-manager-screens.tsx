import {
  AlertTriangle,
  Archive,
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  CircleDollarSign,
  ClipboardCheck,
  PackageCheck,
  Plus,
  Save,
  Truck,
} from "lucide-react";

import {
  DetailGrid,
  DetailItem,
  MetricCard,
  MetricGrid,
  PortalAction,
  PortalPageHeader,
  PortalSection,
  PortalTable,
  PortalToolbar,
  ProgressList,
  StatusPill,
} from "@/components/internal/portal-ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function WarehouseManagerScreen({ slug }: { slug: string }) {
  switch (slug) {
    case "tong-quan": return <WarehouseDashboard />;
    case "ton-kho": return <InventoryScreen />;
    case "canh-bao": return <LowStockScreen />;
    case "nha-cung-cap": return <ProvidersScreen />;
    case "phieu-nhap-xuat": return <StockTicketsScreen />;
    case "dieu-chinh-ton": return <InventoryAdjustmentScreen />;
    case "lich-su": return <InventoryHistoryScreen />;
    case "bao-cao": return <WarehouseReportsScreen />;
    default: return null;
  }
}

const inventoryRows = [
  ["Paracetamol 500mg", "Viên", "2.480", "500", "1.200 đ", <StatusPill key="1" tone="green">Ổn định</StatusPill>],
  ["Amoxicillin 500mg", "Viên", "860", "300", "2.800 đ", <StatusPill key="2" tone="green">Ổn định</StatusPill>],
  ["Amlodipine 5mg", "Viên", "142", "150", "3.500 đ", <StatusPill key="3" tone="amber">Dưới ngưỡng</StatusPill>],
  ["Natri Clorid 0,9%", "Chai", "0", "50", "18.000 đ", <StatusPill key="4" tone="red">Hết hàng</StatusPill>],
  ["Omeprazole 20mg", "Viên", "226", "250", "2.100 đ", <StatusPill key="5" tone="amber">Dưới ngưỡng</StatusPill>],
];

const ticketRows = [
  ["NK-260923-005", <StatusPill key="1" tone="green">Nhập kho</StatusPill>, "Dược phẩm An Khang", "12", "18.450.000 đ", <StatusPill key="2" tone="amber">Chờ duyệt</StatusPill>],
  ["XK-260923-002", <StatusPill key="3" tone="blue">Xuất kho</StatusPill>, "Khoa Dược", "5", "4.280.000 đ", <StatusPill key="4" tone="amber">Chờ duyệt</StatusPill>],
  ["NK-260922-018", <StatusPill key="5" tone="green">Nhập kho</StatusPill>, "Y tế Minh Long", "24", "42.680.000 đ", <StatusPill key="6" tone="green">Đã xác nhận</StatusPill>],
  ["XK-260922-011", <StatusPill key="7" tone="blue">Xuất kho</StatusPill>, "Khoa Nội", "8", "6.120.000 đ", <StatusPill key="8" tone="red">Đã hủy</StatusPill>],
];

function WarehouseDashboard() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Kho BV Đa khoa Thành Phố" title="Tổng quan kho thuốc" description="Theo dõi tồn kho, cảnh báo dưới ngưỡng và các phiếu cần quản trị viên chi nhánh duyệt." actions={<><PortalAction>Tải danh sách tồn</PortalAction><PortalAction variant="default"><Plus />Tạo phiếu</PortalAction></>} />
      <MetricGrid>
        <MetricCard label="Mặt hàng trong kho" value="428" detail="392 thuốc đang hoạt động" icon={<Boxes className="size-5" />} />
        <MetricCard label="Dưới ngưỡng" value="16" detail="5 mặt hàng đã hết" icon={<AlertTriangle className="size-5" />} tone="red" />
        <MetricCard label="Phiếu chờ duyệt" value="7" detail="5 nhập kho, 2 xuất kho" icon={<ClipboardCheck className="size-5" />} tone="amber" />
        <MetricCard label="Giá trị tồn" value="1,84 tỷ" detail="Tăng 2,4% so với đầu tháng" trend="up" icon={<CircleDollarSign className="size-5" />} tone="green" />
      </MetricGrid>
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PortalSection title="Thuốc cần xử lý sớm" action={<PortalAction>Xem cảnh báo</PortalAction>}>
          <PortalTable caption="Thuốc cần xử lý sớm" columns={["Thuốc", "Tồn", "Tối thiểu", "Dự kiến dùng", "Mức độ"]} rows={[
            ["Natri Clorid 0,9%", "0 chai", "50", "18 chai/ngày", <StatusPill key="1" tone="red">Nghiêm trọng</StatusPill>],
            ["Amlodipine 5mg", "142 viên", "150", "36 viên/ngày", <StatusPill key="2" tone="amber">Cảnh báo</StatusPill>],
            ["Omeprazole 20mg", "226 viên", "250", "42 viên/ngày", <StatusPill key="3" tone="amber">Cảnh báo</StatusPill>],
          ]} />
        </PortalSection>
        <PortalSection title="Nhập xuất tháng 09">
          <ProgressList items={[
            { label: "Nhập kho", value: 78, display: "482,6 triệu", color: "bg-emerald-500" },
            { label: "Xuất kho", value: 62, display: "386,4 triệu" },
            { label: "Điều chỉnh giảm", value: 8, display: "12,2 triệu", color: "bg-red-400" },
          ]} />
        </PortalSection>
      </div>
    </div>
  );
}

function InventoryScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Tồn theo chi nhánh" title="Tồn kho thuốc" description="Theo dõi số lượng thực tế và ngưỡng tối thiểu của từng thuốc trong kho." actions={<PortalAction>Kiểm kê kho</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Tổng mặt hàng" value="428" detail="392 đang hoạt động" icon={<Archive className="size-5" />} />
        <MetricCard label="Tổng số lượng" value="84.260" detail="Tất cả đơn vị quy đổi" icon={<Boxes className="size-5" />} tone="cyan" />
        <MetricCard label="Dưới ngưỡng" value="16" detail="3,7% danh mục tồn" icon={<AlertTriangle className="size-5" />} tone="amber" />
        <MetricCard label="Hết hàng" value="5" detail="Đã có đề xuất nhập bổ sung" icon={<PackageCheck className="size-5" />} tone="red" />
      </MetricGrid>
      <PortalSection title="Danh sách tồn kho" description="Số lượng được cập nhật khi phiếu chuyển sang Confirmed.">
        <PortalToolbar placeholder="Tìm tên thuốc" filters={[{ label: "Tất cả đơn vị", options: ["Viên", "Chai", "Hộp", "Tuýp"] }, { label: "Mức tồn", options: ["Ổn định", "Dưới ngưỡng", "Hết hàng"] }]} />
        <PortalTable caption="Danh sách tồn kho thuốc" columns={["Tên thuốc", "Đơn vị", "Số lượng", "Tối thiểu", "Đơn giá", "Mức tồn"]} rows={inventoryRows} />
      </PortalSection>
    </div>
  );
}

function LowStockScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Theo dõi ngưỡng" title="Cảnh báo tồn kho" description="Ưu tiên mặt hàng đã hết hoặc có lượng tồn thấp hơn MinimumQuantity." actions={<PortalAction variant="default">Tạo phiếu nhập từ cảnh báo</PortalAction>} />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Nghiêm trọng", "5", "Đã hết hàng", "border-red-300 bg-red-50", "text-red-700"],
          ["Cảnh báo", "11", "Dưới ngưỡng tối thiểu", "border-amber-300 bg-amber-50", "text-amber-700"],
          ["Cần theo dõi", "24", "Còn dưới 14 ngày", "border-blue-300 bg-blue-50", "text-blue-700"],
        ].map(([label, value, detail, box, text]) => (
          <article key={label} className={`border-l-4 p-5 ${box}`}><p className={`text-sm font-semibold ${text}`}>{label}</p><p className="mt-2 text-3xl font-bold text-[#173b57]">{value}</p><p className="mt-2 text-xs text-muted-foreground">{detail}</p></article>
        ))}
      </div>
      <PortalSection title="Danh sách cần bổ sung">
        <PortalToolbar placeholder="Tìm thuốc cảnh báo" filters={[{ label: "Tất cả mức độ", options: ["Nghiêm trọng", "Cảnh báo", "Theo dõi"] }]} />
        <PortalTable caption="Danh sách thuốc cần bổ sung" columns={["Tên thuốc", "Hiện có", "Tối thiểu", "Thiếu hụt", "Đề xuất nhập", "Mức độ"]} rows={[
          ["Natri Clorid 0,9%", "0 chai", "50", "50", "200 chai", <StatusPill key="1" tone="red">Nghiêm trọng</StatusPill>],
          ["Amlodipine 5mg", "142 viên", "150", "8", "500 viên", <StatusPill key="2" tone="amber">Cảnh báo</StatusPill>],
          ["Omeprazole 20mg", "226 viên", "250", "24", "600 viên", <StatusPill key="3" tone="amber">Cảnh báo</StatusPill>],
          ["Cefuroxime 500mg", "315 viên", "320", "5", "400 viên", <StatusPill key="4" tone="amber">Cảnh báo</StatusPill>],
        ]} />
      </PortalSection>
    </div>
  );
}

function ProvidersScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Đối tác cung ứng" title="Nhà cung cấp" description="Quản lý thông tin liên hệ và trạng thái nhà cung cấp phục vụ nhập kho." actions={<PortalAction variant="default"><Plus />Thêm nhà cung cấp</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Tổng nhà cung cấp" value="18" detail="16 đang hoạt động" icon={<Truck className="size-5" />} />
        <MetricCard label="Đơn nhập tháng này" value="42" detail="Tổng giá trị 482,6 triệu" icon={<ArrowDownToLine className="size-5" />} tone="green" />
        <MetricCard label="Giao đúng hạn" value="94,2%" detail="Tăng 1,6 điểm phần trăm" trend="up" icon={<PackageCheck className="size-5" />} tone="cyan" />
        <MetricCard label="Tạm ngưng" value="2" detail="Không thể chọn cho phiếu mới" icon={<AlertTriangle className="size-5" />} tone="amber" />
      </MetricGrid>
      <PortalSection title="Danh sách nhà cung cấp">
        <PortalToolbar placeholder="Tìm tên, địa chỉ hoặc hotline" filters={[{ label: "Tất cả trạng thái", options: ["Hoạt động", "Tạm ngưng"] }]} />
        <PortalTable caption="Danh sách nhà cung cấp" columns={["Nhà cung cấp", "Địa chỉ", "Hotline", "Phiếu nhập", "Trạng thái"]} rows={[
          ["Dược phẩm An Khang", "Quận 10, TP.HCM", "028 3833 2211", "18 phiếu", <StatusPill key="1" tone="green">Hoạt động</StatusPill>],
          ["Y tế Minh Long", "Quận Tân Bình, TP.HCM", "028 3991 0842", "12 phiếu", <StatusPill key="2" tone="green">Hoạt động</StatusPill>],
          ["Dược phẩm Đông Nam", "TP. Dĩ An, Bình Dương", "0274 377 2038", "8 phiếu", <StatusPill key="3" tone="green">Hoạt động</StatusPill>],
          ["Thiết bị Y khoa Việt", "Quận 7, TP.HCM", "028 3775 6192", "4 phiếu", <StatusPill key="4">Tạm ngưng</StatusPill>],
        ]} />
      </PortalSection>
    </div>
  );
}

function StockTicketsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Nghiệp vụ kho" title="Phiếu nhập xuất" description="Tạo và chỉnh sửa phiếu Pending. Việc xác nhận do HOSPITAL_ADMIN thực hiện." actions={<><PortalAction><ArrowUpFromLine />Tạo phiếu xuất</PortalAction><PortalAction variant="default"><ArrowDownToLine />Tạo phiếu nhập</PortalAction></>} />
      <MetricGrid>
        <MetricCard label="Chờ duyệt" value="7" detail="5 nhập, 2 xuất" icon={<ClipboardCheck className="size-5" />} tone="amber" />
        <MetricCard label="Đã xác nhận tháng này" value="86" detail="Cập nhật tồn kho thành công" icon={<PackageCheck className="size-5" />} tone="green" />
        <MetricCard label="Giá trị nhập" value="482,6 triệu" detail="42 phiếu nhập" icon={<ArrowDownToLine className="size-5" />} />
        <MetricCard label="Giá trị xuất" value="386,4 triệu" detail="44 phiếu xuất" icon={<ArrowUpFromLine className="size-5" />} tone="cyan" />
      </MetricGrid>
      <PortalSection title="Danh sách phiếu">
        <PortalToolbar placeholder="Tìm mã phiếu hoặc nhà cung cấp" filters={[{ label: "Tất cả loại", options: ["Nhập kho", "Xuất kho"] }, { label: "Trạng thái", options: ["Chờ duyệt", "Đã xác nhận", "Đã hủy"] }]} />
        <PortalTable caption="Danh sách phiếu nhập xuất" columns={["Mã phiếu", "Loại", "Đối tác / bộ phận", "Mặt hàng", "Tổng giá trị", "Trạng thái"]} rows={ticketRows} />
      </PortalSection>
    </div>
  );
}

function InventoryAdjustmentScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Thao tác có kiểm toán" title="Điều chỉnh tồn kho" description="Mọi điều chỉnh bắt buộc có lý do và được ghi vào nhật ký hoạt động." />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PortalSection title="Tạo phiếu điều chỉnh" description="Kiểm tra số lượng thực tế trước khi xác nhận.">
          <form className="space-y-5 p-5">
            <Field label="Thuốc" defaultValue="Amlodipine 5mg" />
            <div className="grid grid-cols-2 gap-4"><Field label="Số lượng hệ thống" defaultValue="142" type="number" /><Field label="Số lượng thực tế" defaultValue="140" type="number" /></div>
            <div className="space-y-2"><Label htmlFor="adjust-reason">Lý do điều chỉnh</Label><Textarea id="adjust-reason" rows={5} placeholder="Mô tả nguyên nhân chênh lệch..." /></div>
            <div className="border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800"><strong>Chênh lệch dự kiến: -2 viên.</strong> Thao tác này sẽ được ghi với tài khoản và thời gian hiện tại.</div>
            <PortalAction variant="default"><Save />Ghi nhận điều chỉnh</PortalAction>
          </form>
        </PortalSection>
        <PortalSection title="Điều chỉnh gần đây">
          <PortalTable caption="Điều chỉnh tồn kho gần đây" columns={["Thời gian", "Thuốc", "Trước", "Sau", "Lý do", "Người thực hiện"]} rows={[
            ["23/09 08:56", "Paracetamol 500mg", "2.485", "2.480", "Hư hỏng bao bì", "Lê Văn Tuấn"],
            ["22/09 16:12", "Amoxicillin 500mg", "858", "860", "Kiểm kê thừa", "Ngô Thanh Hà"],
            ["22/09 09:44", "Natri Clorid 0,9%", "4", "0", "Hết hạn sử dụng", "Lê Văn Tuấn"],
          ]} />
        </PortalSection>
      </div>
    </div>
  );
}

function InventoryHistoryScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Sổ biến động" title="Lịch sử kho" description="Tra cứu toàn bộ biến động nhập, xuất và điều chỉnh của từng mặt hàng." actions={<PortalAction>Xuất sổ kho</PortalAction>} />
      <PortalSection title="Dòng biến động">
        <PortalToolbar placeholder="Tìm thuốc hoặc mã phiếu" filters={[{ label: "30 ngày gần nhất", options: ["Hôm nay", "7 ngày", "90 ngày"] }, { label: "Tất cả nghiệp vụ", options: ["Nhập kho", "Xuất kho", "Điều chỉnh"] }]} />
        <PortalTable caption="Lịch sử biến động kho" columns={["Thời gian", "Thuốc", "Nghiệp vụ", "Chứng từ", "Biến động", "Tồn sau"]} rows={[
          ["23/09 09:28", "Paracetamol 500mg", <StatusPill key="1" tone="blue">Xuất kho</StatusPill>, "XK-260923-001", "-120", "2.480"],
          ["23/09 08:56", "Paracetamol 500mg", <StatusPill key="2" tone="amber">Điều chỉnh</StatusPill>, "ADJ-260923-003", "-5", "2.600"],
          ["22/09 16:45", "Amoxicillin 500mg", <StatusPill key="3" tone="green">Nhập kho</StatusPill>, "NK-260922-018", "+500", "860"],
          ["22/09 15:12", "Natri Clorid 0,9%", <StatusPill key="4" tone="blue">Xuất kho</StatusPill>, "XK-260922-010", "-24", "0"],
        ]} />
      </PortalSection>
    </div>
  );
}

function WarehouseReportsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Phân tích kho" title="Báo cáo nhập xuất tồn" description="Tổng hợp giá trị và tốc độ luân chuyển kho trong phạm vi chi nhánh." actions={<PortalAction variant="default">Tải báo cáo</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Tồn đầu kỳ" value="1,74 tỷ" detail="Ngày 01/09/2026" icon={<Archive className="size-5" />} />
        <MetricCard label="Nhập trong kỳ" value="482,6 triệu" detail="42 phiếu đã xác nhận" trend="up" icon={<ArrowDownToLine className="size-5" />} tone="green" />
        <MetricCard label="Xuất trong kỳ" value="386,4 triệu" detail="44 phiếu đã xác nhận" icon={<ArrowUpFromLine className="size-5" />} tone="cyan" />
        <MetricCard label="Tồn cuối kỳ" value="1,84 tỷ" detail="Chênh lệch +96,2 triệu" icon={<CircleDollarSign className="size-5" />} tone="amber" />
      </MetricGrid>
      <div className="grid gap-6 lg:grid-cols-2">
        <PortalSection title="Giá trị theo nhóm đơn vị"><ProgressList items={[
          { label: "Viên", value: 84, display: "920 triệu" },
          { label: "Chai", value: 62, display: "482 triệu", color: "bg-cyan-500" },
          { label: "Hộp", value: 48, display: "316 triệu", color: "bg-emerald-500" },
          { label: "Tuýp & gói", value: 22, display: "122 triệu", color: "bg-amber-500" },
        ]} /></PortalSection>
        <PortalSection title="Chỉ số kiểm soát">
          <DetailGrid>
            <DetailItem label="Tỷ lệ dưới ngưỡng" value="3,7%" />
            <DetailItem label="Tỷ lệ hết hàng" value="1,2%" />
            <DetailItem label="Phiếu bị hủy" value="2,3%" />
            <DetailItem label="Số ngày tồn bình quân" value="38 ngày" />
            <DetailItem label="Nhà cung cấp hoạt động" value="16" />
            <DetailItem label="Lần điều chỉnh tồn" value="12" />
          </DetailGrid>
        </PortalSection>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  const id = `warehouse-${label.toLowerCase().replaceAll(" ", "-")}`;
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} type={type} defaultValue={defaultValue} /></div>;
}
