import {
  Activity,
  Building2,
  CircleDollarSign,
  Database,
  FileCheck2,
  Hospital,
  Plus,
  ShieldAlert,
  Stethoscope,
  UsersRound,
} from "lucide-react";

import {
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

const hospitalRows = [
  ["BV Đa khoa Thành Phố", "TP. Hồ Chí Minh", "24", <StatusPill key="a" tone="green">Hoạt động</StatusPill>, "22/09/2026"],
  ["BV Quốc tế An Sinh", "TP. Hồ Chí Minh", "18", <StatusPill key="b" tone="green">Hoạt động</StatusPill>, "21/09/2026"],
  ["Phòng khám Minh Tâm", "Bình Dương", "8", <StatusPill key="c" tone="amber">Tạm ngưng</StatusPill>, "18/09/2026"],
  ["BV Đa khoa Phương Nam", "Đồng Nai", "32", <StatusPill key="d" tone="green">Hoạt động</StatusPill>, "15/09/2026"],
];

const departmentRows = [
  ["Tim mạch", "tim-mach", "4 cơ sở", <StatusPill key="a" tone="green">Hoạt động</StatusPill>],
  ["Nhi khoa", "nhi-khoa", "3 cơ sở", <StatusPill key="b" tone="green">Hoạt động</StatusPill>],
  ["Cơ xương khớp", "co-xuong-khop", "4 cơ sở", <StatusPill key="c" tone="green">Hoạt động</StatusPill>],
  ["Da liễu", "da-lieu", "2 cơ sở", <StatusPill key="d">Chưa phân bổ</StatusPill>],
];

export function SystemAdminScreen({ slug }: { slug: string }) {
  switch (slug) {
    case "tong-quan": return <SystemDashboard />;
    case "co-so-y-te": return <HospitalsScreen />;
    case "chuyen-khoa": return <DepartmentsScreen />;
    case "dich-vu": return <ServicesScreen />;
    case "thuoc": return <MedicinesScreen />;
    case "tai-khoan": return <AccountsScreen />;
    case "bao-cao": return <SystemReportsScreen />;
    case "nhat-ky-he-thong": return <SystemAuditScreen />;
    default: return null;
  }
}

function SystemDashboard() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Toàn hệ thống" title="Tổng quan vận hành" description="Theo dõi sức khỏe nền tảng, quy mô mạng lưới và các vấn đề cần xử lý." actions={<PortalAction variant="default">Xuất báo cáo</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Cơ sở hoạt động" value="12" detail="Tăng 2 cơ sở trong quý" trend="up" icon={<Hospital className="size-5" />} />
        <MetricCard label="Tài khoản nhân sự" value="386" detail="97,4% đang hoạt động" icon={<UsersRound className="size-5" />} tone="cyan" />
        <MetricCard label="Lịch hẹn tháng này" value="8.420" detail="Tăng 11,8% so với tháng trước" trend="up" icon={<Activity className="size-5" />} tone="green" />
        <MetricCard label="Cảnh báo hệ thống" value="3" detail="1 cảnh báo cần xử lý ngay" trend="down" icon={<ShieldAlert className="size-5" />} tone="amber" />
      </MetricGrid>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <PortalSection title="Hoạt động theo chi nhánh" description="Tổng lịch hẹn trong 30 ngày gần nhất">
          <ProgressList items={[
            { label: "BV Đa khoa Thành Phố", value: 86, display: "2.845 lịch" },
            { label: "BV Quốc tế An Sinh", value: 68, display: "2.240 lịch", color: "bg-cyan-500" },
            { label: "BV Đa khoa Phương Nam", value: 54, display: "1.780 lịch", color: "bg-emerald-500" },
            { label: "Phòng khám Minh Tâm", value: 31, display: "1.021 lịch", color: "bg-amber-500" },
          ]} />
        </PortalSection>
        <PortalSection title="Tình trạng nền tảng" description="Cập nhật lúc 09:42">
          <div className="divide-y p-5 pt-2">
            {["API đặt lịch", "Dịch vụ xác thực", "Mock API", "Lưu trữ hình ảnh"].map((name, index) => (
              <div key={name} className="flex items-center justify-between py-3 text-sm">
                <span>{name}</span>
                <StatusPill tone={index === 2 ? "amber" : "green"}>{index === 2 ? "Theo dõi" : "Ổn định"}</StatusPill>
              </div>
            ))}
          </div>
        </PortalSection>
      </div>
      <PortalSection title="Thay đổi quản trị gần đây">
        <PortalTable caption="Thay đổi quản trị gần đây" columns={["Thời gian", "Người thực hiện", "Hành động", "Đối tượng", "Kết quả"]} rows={[
          ["09:35 23/09", "Trần Hoàng Nam", "Cập nhật trạng thái", "Phòng khám Minh Tâm", <StatusPill key="1" tone="green">Thành công</StatusPill>],
          ["08:12 23/09", "Lê Ngọc Anh", "Tạo quản trị viên", "BV Phương Nam", <StatusPill key="2" tone="green">Thành công</StatusPill>],
          ["16:48 22/09", "Trần Hoàng Nam", "Cập nhật dịch vụ", "MRI sọ não", <StatusPill key="3" tone="green">Thành công</StatusPill>],
        ]} />
      </PortalSection>
    </div>
  );
}

function HospitalsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Danh mục toàn hệ thống" title="Cơ sở y tế" description="Quản lý thông tin, trạng thái và quy mô phòng của các chi nhánh." actions={<PortalAction variant="default"><Plus />Thêm cơ sở</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Tổng cơ sở" value="14" detail="12 đang hoạt động" icon={<Building2 className="size-5" />} />
        <MetricCard label="Tổng phòng" value="246" detail="218 phòng khả dụng" icon={<Hospital className="size-5" />} tone="cyan" />
        <MetricCard label="Tỉnh thành" value="6" detail="Phủ 3 vùng vận hành" icon={<Database className="size-5" />} tone="green" />
        <MetricCard label="Tạm ngưng" value="2" detail="Cần rà soát trước 30/09" icon={<ShieldAlert className="size-5" />} tone="amber" />
      </MetricGrid>
      <PortalSection title="Danh sách cơ sở" description="Chỉ SYSTEM_ADMIN được tạo mới hoặc thay đổi trạng thái toàn cục.">
        <PortalToolbar placeholder="Tìm tên hoặc địa chỉ cơ sở" filters={[{ label: "Tất cả trạng thái", options: ["Hoạt động", "Tạm ngưng"] }]} />
        <PortalTable caption="Danh sách cơ sở y tế" columns={["Tên cơ sở", "Khu vực", "Số phòng", "Trạng thái", "Cập nhật"]} rows={hospitalRows} />
      </PortalSection>
    </div>
  );
}

function DepartmentsScreen() {
  return <CatalogScreen eyebrow="Danh mục chuyên môn" title="Chuyên khoa" description="Quản lý danh mục chuyên khoa gốc và theo dõi mức độ phân bổ đến các chi nhánh." action="Thêm chuyên khoa" icon={<Stethoscope className="size-5" />} rows={departmentRows} columns={["Tên chuyên khoa", "Slug", "Phân bổ", "Trạng thái"]} />;
}

function ServicesScreen() {
  return <CatalogScreen eyebrow="Danh mục chuyên môn" title="Dịch vụ y tế" description="Quản lý giá tham chiếu, giờ thực hiện và trạng thái dịch vụ dùng chung." action="Thêm dịch vụ" icon={<Activity className="size-5" />} columns={["Tên dịch vụ", "Giá tham chiếu", "Cơ sở cung cấp", "Trạng thái"]} rows={[
    ["Khám tim mạch chuyên sâu", "450.000 đ", "4 cơ sở", <StatusPill key="1" tone="green">Hoạt động</StatusPill>],
    ["Siêu âm tổng quát", "320.000 đ", "8 cơ sở", <StatusPill key="2" tone="green">Hoạt động</StatusPill>],
    ["MRI sọ não", "2.400.000 đ", "2 cơ sở", <StatusPill key="3" tone="green">Hoạt động</StatusPill>],
    ["Gói khám doanh nghiệp", "1.850.000 đ", "3 cơ sở", <StatusPill key="4" tone="amber">Đang rà soát</StatusPill>],
  ]} />;
}

function MedicinesScreen() {
  return <CatalogScreen eyebrow="Danh mục dược" title="Danh mục thuốc" description="Quản lý thông tin thuốc gốc dùng chung; tồn kho được quản lý riêng tại từng chi nhánh." action="Thêm thuốc" icon={<Database className="size-5" />} columns={["Tên thuốc", "Đơn vị", "Giá", "Sử dụng tại", "Trạng thái"]} rows={[
    ["Paracetamol 500mg", "Viên", "1.200 đ", "12 cơ sở", <StatusPill key="1" tone="green">Hoạt động</StatusPill>],
    ["Amoxicillin 500mg", "Viên", "2.800 đ", "10 cơ sở", <StatusPill key="2" tone="green">Hoạt động</StatusPill>],
    ["Natri Clorid 0,9%", "Chai", "18.000 đ", "12 cơ sở", <StatusPill key="3" tone="green">Hoạt động</StatusPill>],
    ["Kem Hydrocortisone", "Tuýp", "42.000 đ", "5 cơ sở", <StatusPill key="4">Ngưng sử dụng</StatusPill>],
  ]} />;
}

function CatalogScreen({ eyebrow, title, description, action, icon, columns, rows }: { eyebrow: string; title: string; description: string; action: string; icon: React.ReactNode; columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow={eyebrow} title={title} description={description} actions={<PortalAction variant="default"><Plus />{action}</PortalAction>} />
      <MetricGrid>
        <MetricCard label={`Tổng ${title.toLowerCase()}`} value="24" detail="21 mục đang hoạt động" icon={icon} />
        <MetricCard label="Mới trong tháng" value="3" detail="Đã qua bước kiểm tra" trend="up" icon={<FileCheck2 className="size-5" />} tone="green" />
        <MetricCard label="Đang rà soát" value="2" detail="Chờ hoàn thiện thông tin" icon={<ShieldAlert className="size-5" />} tone="amber" />
        <MetricCard label="Tỷ lệ sử dụng" value="87%" detail="Trên toàn mạng lưới" icon={<Activity className="size-5" />} tone="cyan" />
      </MetricGrid>
      <PortalSection title={`Danh sách ${title.toLowerCase()}`}>
        <PortalToolbar placeholder={`Tìm ${title.toLowerCase()}`} filters={[{ label: "Tất cả trạng thái", options: ["Hoạt động", "Tạm ngưng"] }]} />
        <PortalTable caption={`Danh sách ${title.toLowerCase()}`} columns={columns} rows={rows} />
      </PortalSection>
    </div>
  );
}

function AccountsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Kiểm soát truy cập" title="Tài khoản hệ thống" description="Quản lý trạng thái, role và chi nhánh của tài khoản nhân sự." actions={<PortalAction variant="default"><Plus />Tạo tài khoản</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Tổng nhân sự" value="386" detail="376 tài khoản hoạt động" icon={<UsersRound className="size-5" />} />
        <MetricCard label="Quản trị chi nhánh" value="18" detail="Tại 12 cơ sở" icon={<ShieldAlert className="size-5" />} tone="cyan" />
        <MetricCard label="Bác sĩ" value="214" detail="Tăng 8 trong tháng" trend="up" icon={<Stethoscope className="size-5" />} tone="green" />
        <MetricCard label="Bị vô hiệu hóa" value="10" detail="2 tài khoản trong tuần" icon={<UsersRound className="size-5" />} tone="red" />
      </MetricGrid>
      <PortalSection title="Danh sách tài khoản">
        <PortalToolbar placeholder="Tìm số điện thoại hoặc cơ sở" filters={[{ label: "Tất cả role", options: ["Hospital Admin", "Doctor", "Staff", "Warehouse Manager"] }, { label: "Trạng thái", options: ["Hoạt động", "Vô hiệu hóa"] }]} />
        <PortalTable caption="Danh sách tài khoản hệ thống" columns={["Tài khoản", "Role", "Chi nhánh", "Trạng thái", "Tạo lúc"]} rows={[
          ["0901 234 567", <StatusPill key="1" tone="purple">HOSPITAL_ADMIN</StatusPill>, "BV Đa khoa Thành Phố", <StatusPill key="2" tone="green">Hoạt động</StatusPill>, "12/03/2026"],
          ["0918 456 221", <StatusPill key="3" tone="blue">DOCTOR</StatusPill>, "BV Quốc tế An Sinh", <StatusPill key="4" tone="green">Hoạt động</StatusPill>, "08/06/2026"],
          ["0932 110 845", <StatusPill key="5">STAFF</StatusPill>, "BV Đa khoa Thành Phố", <StatusPill key="6" tone="green">Hoạt động</StatusPill>, "14/07/2026"],
          ["0988 332 019", <StatusPill key="7" tone="amber">WAREHOUSE_MANAGER</StatusPill>, "Phòng khám Minh Tâm", <StatusPill key="8" tone="red">Vô hiệu hóa</StatusPill>, "21/01/2026"],
        ]} />
      </PortalSection>
    </div>
  );
}

function SystemReportsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Phân tích toàn hệ thống" title="Báo cáo hệ thống" description="Số liệu tổng hợp phục vụ vận hành, không hiển thị nội dung lâm sàng chi tiết." actions={<><PortalAction>Chọn kỳ báo cáo</PortalAction><PortalAction variant="default">Tải xuống</PortalAction></>} />
      <MetricGrid>
        <MetricCard label="Tổng lịch hẹn" value="24.680" detail="Quý III/2026" trend="up" icon={<Activity className="size-5" />} />
        <MetricCard label="Tỷ lệ hoàn thành" value="86,4%" detail="Tăng 3,1 điểm phần trăm" trend="up" icon={<FileCheck2 className="size-5" />} tone="green" />
        <MetricCard label="Tỷ lệ hủy" value="5,8%" detail="Giảm 0,7 điểm phần trăm" trend="down" icon={<ShieldAlert className="size-5" />} tone="amber" />
        <MetricCard label="Giá trị dịch vụ" value="8,2 tỷ" detail="Ước tính theo lịch hoàn tất" icon={<CircleDollarSign className="size-5" />} tone="cyan" />
      </MetricGrid>
      <div className="grid gap-6 lg:grid-cols-2">
        <PortalSection title="Lịch hẹn theo trạng thái"><ProgressList items={[
          { label: "Hoàn thành", value: 86, display: "21.324", color: "bg-emerald-500" },
          { label: "Đã xác nhận", value: 48, display: "1.936" },
          { label: "Chờ xác nhận", value: 26, display: "986", color: "bg-amber-500" },
          { label: "Đã hủy", value: 18, display: "1.434", color: "bg-red-400" },
        ]} /></PortalSection>
        <PortalSection title="Công suất theo khu vực"><ProgressList items={[
          { label: "TP. Hồ Chí Minh", value: 91, display: "91%" },
          { label: "Đồng Nai", value: 76, display: "76%", color: "bg-cyan-500" },
          { label: "Bình Dương", value: 68, display: "68%", color: "bg-emerald-500" },
          { label: "Long An", value: 54, display: "54%", color: "bg-amber-500" },
        ]} /></PortalSection>
      </div>
    </div>
  );
}

function SystemAuditScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Kiểm toán và bảo mật" title="Nhật ký hệ thống" description="Theo dõi hành động quản trị, thay đổi trạng thái và truy cập dữ liệu nhạy cảm." actions={<PortalAction variant="default">Xuất nhật ký</PortalAction>} />
      <PortalSection title="Dòng sự kiện" description="Nhật ký chỉ đọc, được lưu theo thời gian hệ thống.">
        <PortalToolbar placeholder="Tìm actor, hành động hoặc tài nguyên" filters={[{ label: "Mức độ", options: ["Thông tin", "Cảnh báo", "Quan trọng"] }, { label: "Khoảng thời gian", options: ["Hôm nay", "7 ngày", "30 ngày"] }]} />
        <PortalTable caption="Nhật ký hệ thống" columns={["Thời gian", "Actor", "Hành động", "Tài nguyên", "Chi nhánh", "Mức độ"]} rows={[
          ["23/09/2026 09:35:12", "Trần Hoàng Nam", "hospital.change_status", "HSP-0003", "Toàn hệ thống", <StatusPill key="1" tone="amber">Cảnh báo</StatusPill>],
          ["23/09/2026 09:02:48", "Lê Ngọc Anh", "account.create_staff", "ACC-0386", "BV Phương Nam", <StatusPill key="2" tone="blue">Thông tin</StatusPill>],
          ["23/09/2026 08:44:03", "Hệ thống", "auth.login_failed", "0908***019", "Không xác định", <StatusPill key="3" tone="red">Quan trọng</StatusPill>],
          ["22/09/2026 17:16:25", "Phạm Minh Tú", "service.update", "SVC-0048", "Toàn hệ thống", <StatusPill key="4" tone="blue">Thông tin</StatusPill>],
        ]} />
      </PortalSection>
    </div>
  );
}
