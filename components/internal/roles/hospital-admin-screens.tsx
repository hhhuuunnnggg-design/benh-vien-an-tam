import {
  Activity,
  BedDouble,
  CalendarCheck2,
  CircleDollarSign,
  ClipboardCheck,
  PackageCheck,
  Plus,
  ShieldAlert,
  Star,
  Stethoscope,
  UsersRound,
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

export function HospitalAdminScreen({ slug }: { slug: string }) {
  switch (slug) {
    case "tong-quan": return <HospitalDashboard />;
    case "thong-tin-chi-nhanh": return <HospitalProfileScreen />;
    case "chuyen-khoa-dich-vu": return <AssignmentsScreen />;
    case "phong-kham": return <RoomsScreen />;
    case "nhan-su": return <StaffAccountsScreen />;
    case "lich-hen": return <HospitalAppointmentsScreen />;
    case "don-thuoc": return <HospitalPrescriptionsScreen />;
    case "kho-thuoc": return <HospitalInventoryScreen />;
    case "danh-gia": return <HospitalReviewsScreen />;
    case "bao-cao": return <HospitalReportsScreen />;
    case "nhat-ky": return <HospitalAuditScreen />;
    default: return null;
  }
}

function HospitalDashboard() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="BV Đa khoa Thành Phố" title="Trung tâm điều hành chi nhánh" description="Tình hình tiếp nhận, phòng khám và công việc cần phê duyệt trong hôm nay." actions={<><PortalAction>Xem lịch trực</PortalAction><PortalAction variant="default">Tạo lịch hẹn</PortalAction></>} />
      <MetricGrid>
        <MetricCard label="Lịch hôm nay" value="148" detail="18 lịch đang chờ xác nhận" icon={<CalendarCheck2 className="size-5" />} />
        <MetricCard label="Đã check-in" value="92" detail="62,2% tổng lịch hôm nay" trend="up" icon={<ClipboardCheck className="size-5" />} tone="green" />
        <MetricCard label="Phòng đang sử dụng" value="16/24" detail="4 phòng đang bảo trì" icon={<BedDouble className="size-5" />} tone="cyan" />
        <MetricCard label="Phiếu chờ duyệt" value="7" detail="5 nhập kho, 2 xuất kho" icon={<PackageCheck className="size-5" />} tone="amber" />
      </MetricGrid>
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PortalSection title="Nhịp tiếp nhận hôm nay" description="Số lượt theo khung giờ"><ProgressList items={[
          { label: "07:00 - 09:00", value: 88, display: "42 lượt" },
          { label: "09:00 - 11:00", value: 72, display: "35 lượt", color: "bg-cyan-500" },
          { label: "13:00 - 15:00", value: 58, display: "28 lượt", color: "bg-emerald-500" },
          { label: "15:00 - 17:00", value: 41, display: "20 lượt", color: "bg-amber-500" },
        ]} /></PortalSection>
        <PortalSection title="Việc cần xử lý">
          <div className="divide-y p-5 pt-2">
            {[
              ["18 lịch chờ xác nhận", "Lịch hẹn", "amber"],
              ["7 phiếu kho chờ duyệt", "Kho thuốc", "blue"],
              ["12 đánh giá chưa xem", "Đánh giá", "purple"],
              ["4 phòng đang bảo trì", "Phòng khám", "red"],
            ].map(([label, category, tone]) => (
              <div key={label} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="font-medium">{label}</span>
                <StatusPill tone={tone as "amber" | "blue" | "purple" | "red"}>{category}</StatusPill>
              </div>
            ))}
          </div>
        </PortalSection>
      </div>
      <PortalSection title="Lịch sắp diễn ra">
        <PortalTable caption="Lịch khám sắp diễn ra" columns={["Giờ", "Bệnh nhân", "Loại lịch", "Bác sĩ / phòng", "Trạng thái"]} rows={appointmentRows.slice(0, 4)} />
      </PortalSection>
    </div>
  );
}

function HospitalProfileScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Thiết lập chi nhánh" title="Thông tin chi nhánh" description="Cập nhật thông tin công khai của BV Đa khoa Thành Phố. Thay đổi trạng thái hoạt động cần SYSTEM_ADMIN phê duyệt." actions={<PortalAction variant="default">Lưu thay đổi</PortalAction>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_20rem]">
        <PortalSection title="Thông tin hiển thị">
          <form className="grid gap-5 p-5 sm:grid-cols-2">
            <Field label="Tên cơ sở" defaultValue="Bệnh viện Đa khoa Thành Phố" />
            <Field label="Slug" defaultValue="benh-vien-da-khoa-thanh-pho" />
            <div className="sm:col-span-2"><Field label="Địa chỉ" defaultValue="215 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh" /></div>
            <Field label="Giờ làm việc" defaultValue="Thứ 2 - Thứ 7, 07:00 - 17:00" />
            <Field label="Số phòng" defaultValue="24" type="number" />
            <div className="space-y-2 sm:col-span-2"><Label htmlFor="hospital-description">Mô tả</Label><Textarea id="hospital-description" rows={6} defaultValue="Bệnh viện đa khoa cung cấp dịch vụ khám, chẩn đoán và điều trị với đội ngũ chuyên môn nhiều kinh nghiệm." /></div>
          </form>
        </PortalSection>
        <PortalSection title="Trạng thái xuất bản">
          <DetailGrid>
            <DetailItem label="Trạng thái" value={<StatusPill tone="green">Hoạt động</StatusPill>} />
            <DetailItem label="Mã cơ sở" value="HSP-0001" />
            <DetailItem label="Cập nhật cuối" value="22/09/2026 16:20" />
            <DetailItem label="Người cập nhật" value="Nguyễn Minh Anh" />
          </DetailGrid>
        </PortalSection>
      </div>
    </div>
  );
}

function AssignmentsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Phân bổ danh mục" title="Chuyên khoa và dịch vụ" description="Chọn danh mục gốc được áp dụng tại chi nhánh; không thay đổi dữ liệu gốc toàn hệ thống." actions={<PortalAction variant="default">Lưu phân bổ</PortalAction>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <AssignmentList title="Chuyên khoa đang áp dụng" count="8/12 chuyên khoa" items={["Tim mạch", "Nhi khoa", "Nội tổng quát", "Cơ xương khớp", "Tai Mũi Họng", "Da liễu"]} />
        <AssignmentList title="Dịch vụ đang cung cấp" count="18/26 dịch vụ" items={["Khám tim mạch chuyên sâu", "Siêu âm tổng quát", "Xét nghiệm máu", "Chụp X-quang", "Nội soi tiêu hóa", "Khám sức khỏe doanh nghiệp"]} />
      </div>
    </div>
  );
}

function AssignmentList({ title, count, items }: { title: string; count: string; items: string[] }) {
  return (
    <PortalSection title={title} description={count} action={<PortalAction><Plus />Gán thêm</PortalAction>}>
      <div className="divide-y">
        {items.map((item, index) => (
          <label key={item} className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 hover:bg-muted/35">
            <span className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" defaultChecked={index < 5} className="size-4 accent-primary" />{item}</span>
            <StatusPill tone={index < 5 ? "green" : "neutral"}>{index < 5 ? "Đang dùng" : "Chưa dùng"}</StatusPill>
          </label>
        ))}
      </div>
    </PortalSection>
  );
}

function RoomsScreen() {
  return <OperationalTable eyebrow="Vận hành cơ sở" title="Phòng khám" description="Quản lý phòng, trạng thái sử dụng và kế hoạch bảo trì." action="Thêm phòng" metrics={[
    ["Tổng phòng", "24", "Theo cấu hình chi nhánh", <BedDouble key="1" className="size-5" />],
    ["Khả dụng", "8", "Sẵn sàng tiếp nhận", <ClipboardCheck key="2" className="size-5" />],
    ["Đang sử dụng", "12", "50% tổng số phòng", <Activity key="3" className="size-5" />],
    ["Bảo trì", "4", "2 phòng hoàn tất hôm nay", <ShieldAlert key="4" className="size-5" />],
  ]} columns={["Phòng", "Khu vực", "Chuyên khoa", "Trạng thái", "Cập nhật"]} rows={[
    ["P.101", "Tầng 1 - Khu A", "Nội tổng quát", <StatusPill key="1" tone="green">Khả dụng</StatusPill>, "09:32"],
    ["P.203", "Tầng 2 - Khu B", "Tim mạch", <StatusPill key="2" tone="blue">Đang sử dụng</StatusPill>, "09:28"],
    ["P.205", "Tầng 2 - Khu B", "Nhi khoa", <StatusPill key="3" tone="blue">Đang sử dụng</StatusPill>, "09:24"],
    ["P.307", "Tầng 3 - Khu C", "Chẩn đoán hình ảnh", <StatusPill key="4" tone="amber">Bảo trì</StatusPill>, "08:10"],
  ]} />;
}

function StaffAccountsScreen() {
  return <OperationalTable eyebrow="Nhân sự chi nhánh" title="Tài khoản nhân sự" description="Tạo và quản lý Doctor, Staff, Warehouse Manager trong đúng phạm vi chi nhánh." action="Thêm nhân sự" metrics={[
    ["Tổng nhân sự", "86", "82 đang hoạt động", <UsersRound key="1" className="size-5" />],
    ["Bác sĩ", "42", "8 chuyên khoa", <Stethoscope key="2" className="size-5" />],
    ["Tiếp nhận", "31", "3 ca làm việc", <ClipboardCheck key="3" className="size-5" />],
    ["Kho thuốc", "13", "2 quản lý chính", <PackageCheck key="4" className="size-5" />],
  ]} columns={["Tài khoản", "Role", "Bộ phận", "Trạng thái", "Đăng nhập cuối"]} rows={[
    ["BS. Nguyễn Hoàng Minh", <StatusPill key="1" tone="blue">DOCTOR</StatusPill>, "Tim mạch", <StatusPill key="2" tone="green">Hoạt động</StatusPill>, "23/09 08:05"],
    ["Trần Thu Hà", <StatusPill key="3">STAFF</StatusPill>, "Tiếp nhận", <StatusPill key="4" tone="green">Hoạt động</StatusPill>, "23/09 06:48"],
    ["Lê Văn Tuấn", <StatusPill key="5" tone="amber">WAREHOUSE_MANAGER</StatusPill>, "Kho thuốc", <StatusPill key="6" tone="green">Hoạt động</StatusPill>, "23/09 07:12"],
    ["BS. Phạm Ngọc Anh", <StatusPill key="7" tone="blue">DOCTOR</StatusPill>, "Nhi khoa", <StatusPill key="8" tone="red">Vô hiệu hóa</StatusPill>, "18/09 16:20"],
  ]} />;
}

const appointmentRows = [
  ["09:30", "Nguyễn Thị Lan · BN-10248", "Khám bác sĩ", "BS. Nguyễn Hoàng Minh · P.203", <StatusPill key="1" tone="blue">Đã xác nhận</StatusPill>],
  ["09:45", "Trần Văn Phúc · BN-08421", "Khám tổng quát", "P.101", <StatusPill key="2" tone="amber">Chờ xác nhận</StatusPill>],
  ["10:00", "Lê Minh Châu · BN-11203", "Siêu âm tổng quát", "P.307", <StatusPill key="3" tone="green">Đã check-in</StatusPill>],
  ["10:15", "Phạm Thị Hồng · BN-09682", "Khám bác sĩ", "BS. Phạm Ngọc Anh · P.205", <StatusPill key="4" tone="blue">Đã xác nhận</StatusPill>],
  ["10:30", "Hoàng Nam Sơn · BN-11824", "Xét nghiệm máu", "P.108", <StatusPill key="5" tone="red">Đã hủy</StatusPill>],
];

function HospitalAppointmentsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Điều phối khám" title="Lịch hẹn chi nhánh" description="Xác nhận, đổi lịch, gán phòng và theo dõi check-in của mọi lịch thuộc chi nhánh." actions={<PortalAction variant="default"><Plus />Tạo lịch thay bệnh nhân</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Tổng lịch hôm nay" value="148" detail="Tăng 8,1% so với thứ Tư trước" trend="up" icon={<CalendarCheck2 className="size-5" />} />
        <MetricCard label="Chờ xác nhận" value="18" detail="Lịch gần nhất lúc 09:45" icon={<ShieldAlert className="size-5" />} tone="amber" />
        <MetricCard label="Đã check-in" value="92" detail="12 bệnh nhân đang chờ" icon={<ClipboardCheck className="size-5" />} tone="green" />
        <MetricCard label="Đã hủy" value="6" detail="4,1% lịch hôm nay" icon={<Activity className="size-5" />} tone="red" />
      </MetricGrid>
      <PortalSection title="Danh sách lịch hẹn">
        <PortalToolbar placeholder="Tìm tên, mã y tế hoặc số điện thoại" filters={[{ label: "Hôm nay", options: ["Ngày mai", "7 ngày tới"] }, { label: "Tất cả trạng thái", options: ["Chờ xác nhận", "Đã xác nhận", "Hoàn thành", "Đã hủy"] }, { label: "Tất cả loại lịch", options: ["Bệnh viện", "Bác sĩ", "Dịch vụ"] }]} />
        <PortalTable caption="Danh sách lịch hẹn chi nhánh" columns={["Giờ", "Bệnh nhân", "Loại lịch", "Bác sĩ / phòng", "Trạng thái"]} rows={appointmentRows} />
      </PortalSection>
    </div>
  );
}

function HospitalPrescriptionsScreen() {
  return <OperationalTable eyebrow="Điều phối đơn thuốc" title="Đơn thuốc chi nhánh" description="Theo dõi đơn khi có mục đích nghiệp vụ; không thay đổi nội dung chuyên môn của bác sĩ." metrics={[
    ["Đơn hôm nay", "74", "62 đơn đã hoàn tất", <ClipboardCheck key="1" className="size-5" />],
    ["Chưa thanh toán", "12", "Tổng tạm tính 3,8 triệu", <CircleDollarSign key="2" className="size-5" />],
    ["Đã thanh toán", "58", "78,4% tổng đơn", <PackageCheck key="3" className="size-5" />],
    ["Đã hủy", "4", "Đều có ghi nhận lý do", <ShieldAlert key="4" className="size-5" />],
  ]} columns={["Mã đơn", "Bệnh nhân", "Bác sĩ", "Tổng tiền", "Trạng thái"]} rows={[
    ["RX-260923-074", "Nguyễn Thị Lan", "BS. Nguyễn Hoàng Minh", "486.000 đ", <StatusPill key="1" tone="amber">Chưa thanh toán</StatusPill>],
    ["RX-260923-073", "Lê Minh Châu", "BS. Trần Thanh Vũ", "328.000 đ", <StatusPill key="2" tone="green">Đã thanh toán</StatusPill>],
    ["RX-260923-072", "Trần Văn Phúc", "BS. Nguyễn Hoàng Minh", "215.000 đ", <StatusPill key="3" tone="green">Đã thanh toán</StatusPill>],
    ["RX-260923-069", "Đỗ Hải Yến", "BS. Phạm Ngọc Anh", "0 đ", <StatusPill key="4" tone="red">Đã hủy</StatusPill>],
  ]} />;
}

function HospitalInventoryScreen() {
  return <OperationalTable eyebrow="Giám sát dược" title="Kho thuốc chi nhánh" description="Theo dõi tồn kho và duyệt phiếu nhập xuất theo nguyên tắc bốn mắt." action="Duyệt phiếu chờ" metrics={[
    ["Mặt hàng", "428", "392 thuốc đang hoạt động", <PackageCheck key="1" className="size-5" />],
    ["Dưới ngưỡng", "16", "5 mặt hàng mức nghiêm trọng", <ShieldAlert key="2" className="size-5" />],
    ["Phiếu chờ duyệt", "7", "5 nhập, 2 xuất", <ClipboardCheck key="3" className="size-5" />],
    ["Giá trị tồn", "1,84 tỷ", "Cập nhật lúc 09:35", <CircleDollarSign key="4" className="size-5" />],
  ]} columns={["Mã phiếu", "Loại", "Người tạo", "Số mặt hàng", "Tạo lúc", "Trạng thái"]} rows={[
    ["NK-260923-005", <StatusPill key="1" tone="green">Nhập kho</StatusPill>, "Lê Văn Tuấn", "12", "23/09 08:44", <StatusPill key="2" tone="amber">Chờ duyệt</StatusPill>],
    ["XK-260923-002", <StatusPill key="3" tone="blue">Xuất kho</StatusPill>, "Ngô Thanh Hà", "5", "23/09 08:12", <StatusPill key="4" tone="amber">Chờ duyệt</StatusPill>],
    ["NK-260922-018", <StatusPill key="5" tone="green">Nhập kho</StatusPill>, "Lê Văn Tuấn", "24", "22/09 16:32", <StatusPill key="6" tone="green">Đã duyệt</StatusPill>],
    ["XK-260922-011", <StatusPill key="7" tone="blue">Xuất kho</StatusPill>, "Ngô Thanh Hà", "8", "22/09 14:08", <StatusPill key="8" tone="red">Đã hủy</StatusPill>],
  ]} />;
}

function HospitalReviewsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Chất lượng dịch vụ" title="Đánh giá người bệnh" description="Kiểm duyệt đánh giá liên quan đến cơ sở, bác sĩ và dịch vụ tại chi nhánh." />
      <MetricGrid>
        <MetricCard label="Điểm trung bình" value="4,7/5" detail="Từ 1.248 đánh giá" icon={<Star className="size-5" />} tone="amber" />
        <MetricCard label="Chưa xem" value="12" detail="5 đánh giá trong hôm nay" icon={<ShieldAlert className="size-5" />} />
        <MetricCard label="Đang hiển thị" value="1.196" detail="95,8% tổng đánh giá" icon={<ClipboardCheck className="size-5" />} tone="green" />
        <MetricCard label="Đã ẩn" value="52" detail="Có lý do kiểm duyệt" icon={<Activity className="size-5" />} tone="red" />
      </MetricGrid>
      <PortalSection title="Hàng chờ kiểm duyệt">
        <PortalToolbar placeholder="Tìm nội dung đánh giá" filters={[{ label: "Tất cả đối tượng", options: ["Cơ sở", "Bác sĩ", "Dịch vụ"] }, { label: "Số sao", options: ["5 sao", "4 sao", "1-3 sao"] }]} />
        <div className="grid gap-4 p-5 lg:grid-cols-2">
          {[
            ["Nguyễn T. L.", "5", "BS. Nguyễn Hoàng Minh", "Bác sĩ tư vấn kỹ, quy trình tiếp nhận nhanh và rõ ràng."],
            ["Trần V. P.", "4", "Siêu âm tổng quát", "Thời gian chờ hơi lâu nhưng nhân viên hỗ trợ nhiệt tình."],
            ["Lê M. C.", "5", "BV Đa khoa Thành Phố", "Cơ sở sạch sẽ, đặt lịch trước nên không phải chờ nhiều."],
            ["Phạm T. H.", "2", "Khoa Nhi", "Khó tìm khu vực phòng khám, cần bổ sung biển hướng dẫn."],
          ].map(([name, stars, target, content]) => (
            <article key={`${name}-${target}`} className="border p-5">
              <div className="flex items-start justify-between gap-4"><div><p className="font-semibold">{name}</p><p className="mt-1 text-xs text-muted-foreground">{target}</p></div><StatusPill tone={Number(stars) >= 4 ? "green" : "amber"}>{stars} sao</StatusPill></div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{content}</p>
              <div className="mt-4 flex gap-2"><PortalAction variant="default">Hiển thị</PortalAction><PortalAction>Ẩn đánh giá</PortalAction></div>
            </article>
          ))}
        </div>
      </PortalSection>
    </div>
  );
}

function HospitalReportsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Phân tích chi nhánh" title="Báo cáo vận hành" description="Theo dõi hiệu quả lịch khám, công suất phòng và doanh thu dự kiến tại chi nhánh." actions={<PortalAction variant="default">Tải báo cáo</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Lịch tháng này" value="2.845" detail="Tăng 9,6% so với tháng trước" trend="up" icon={<CalendarCheck2 className="size-5" />} />
        <MetricCard label="Hoàn thành" value="88,2%" detail="Mục tiêu tháng là 85%" trend="up" icon={<ClipboardCheck className="size-5" />} tone="green" />
        <MetricCard label="Công suất phòng" value="76%" detail="Cao điểm 09:00 - 11:00" icon={<BedDouble className="size-5" />} tone="cyan" />
        <MetricCard label="Doanh thu dự kiến" value="3,24 tỷ" detail="Khám, dịch vụ và đơn thuốc" icon={<CircleDollarSign className="size-5" />} tone="amber" />
      </MetricGrid>
      <div className="grid gap-6 lg:grid-cols-2">
        <PortalSection title="Hiệu suất chuyên khoa"><ProgressList items={[
          { label: "Tim mạch", value: 92, display: "92%" },
          { label: "Nội tổng quát", value: 84, display: "84%", color: "bg-cyan-500" },
          { label: "Nhi khoa", value: 78, display: "78%", color: "bg-emerald-500" },
          { label: "Cơ xương khớp", value: 65, display: "65%", color: "bg-amber-500" },
        ]} /></PortalSection>
        <PortalSection title="Cơ cấu doanh thu"><ProgressList items={[
          { label: "Dịch vụ y tế", value: 74, display: "1,42 tỷ" },
          { label: "Khám bác sĩ", value: 58, display: "1,08 tỷ", color: "bg-cyan-500" },
          { label: "Đơn thuốc", value: 41, display: "740 triệu", color: "bg-emerald-500" },
        ]} /></PortalSection>
      </div>
    </div>
  );
}

function HospitalAuditScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Kiểm toán chi nhánh" title="Nhật ký hoạt động" description="Theo dõi thay đổi trạng thái, phê duyệt và truy cập nghiệp vụ trong chi nhánh." actions={<PortalAction>Xuất nhật ký</PortalAction>} />
      <PortalSection title="Hoạt động gần đây">
        <PortalToolbar placeholder="Tìm nhân sự hoặc hành động" filters={[{ label: "Tất cả phân hệ", options: ["Lịch hẹn", "Kho thuốc", "Nhân sự", "Phòng"] }]} />
        <PortalTable caption="Nhật ký chi nhánh" columns={["Thời gian", "Nhân sự", "Hành động", "Đối tượng", "Kết quả"]} rows={[
          ["23/09 09:38", "Trần Thu Hà", "appointment.check_in", "APT-10248", <StatusPill key="1" tone="green">Thành công</StatusPill>],
          ["23/09 09:22", "Nguyễn Minh Anh", "stock_ticket.confirm", "NK-260923-004", <StatusPill key="2" tone="green">Thành công</StatusPill>],
          ["23/09 08:56", "Lê Văn Tuấn", "inventory.adjust", "MED-0182", <StatusPill key="3" tone="amber">Đã ghi lý do</StatusPill>],
          ["23/09 08:31", "Trần Thu Hà", "appointment.assign_room", "APT-10244", <StatusPill key="4" tone="green">Thành công</StatusPill>],
        ]} />
      </PortalSection>
    </div>
  );
}

function OperationalTable({ eyebrow, title, description, action, metrics, columns, rows }: { eyebrow: string; title: string; description: string; action?: string; metrics: [string, string, string, React.ReactNode][]; columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow={eyebrow} title={title} description={description} actions={action ? <PortalAction variant="default"><Plus />{action}</PortalAction> : undefined} />
      <MetricGrid>{metrics.map(([label, value, detail, icon], index) => <MetricCard key={label} label={label} value={value} detail={detail} icon={icon} tone={(["blue", "cyan", "green", "amber"] as const)[index]} />)}</MetricGrid>
      <PortalSection title={`Danh sách ${title.toLowerCase()}`}>
        <PortalToolbar placeholder={`Tìm trong ${title.toLowerCase()}`} filters={[{ label: "Tất cả trạng thái", options: ["Hoạt động", "Chờ xử lý", "Đã hoàn tất", "Đã hủy"] }]} />
        <PortalTable caption={`Danh sách ${title.toLowerCase()}`} columns={columns} rows={rows} />
      </PortalSection>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  const id = `hospital-${label.toLowerCase().replaceAll(" ", "-")}`;
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} type={type} defaultValue={defaultValue} /></div>;
}
