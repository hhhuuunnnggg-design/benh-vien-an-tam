import {
  BedDouble,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  PackageCheck,
  Plus,
  UserCheck,
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

export function StaffScreen({ slug }: { slug: string }) {
  switch (slug) {
    case "tong-quan": return <StaffDashboard />;
    case "lich-hen": return <StaffAppointmentsScreen />;
    case "tiep-nhan": return <ReceptionScreen />;
    case "phong-kham": return <StaffRoomsScreen />;
    case "thanh-toan-cap-thuoc": return <PaymentDispensingScreen />;
    case "danh-gia": return <StaffReviewsScreen />;
    default: return null;
  }
}

const queueRows = [
  ["A-028", "Nguyễn Thị Lan", "09:30", "Tim mạch · P.203", <StatusPill key="1" tone="blue">Đang chờ</StatusPill>],
  ["A-029", "Lê Minh Châu", "09:45", "Siêu âm · P.307", <StatusPill key="2" tone="green">Đã gọi</StatusPill>],
  ["A-030", "Trần Văn Phúc", "09:45", "Nội tổng quát · Chưa gán", <StatusPill key="3" tone="amber">Cần gán phòng</StatusPill>],
  ["A-031", "Phạm Thị Hồng", "10:00", "Nhi khoa · P.205", <StatusPill key="4" tone="blue">Đang chờ</StatusPill>],
];

function StaffDashboard() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Quầy tiếp nhận số 2" title="Vận hành hôm nay" description="Theo dõi lượt chờ, lịch chưa xác nhận và tình trạng phòng để tiếp nhận nhanh hơn." actions={<PortalAction variant="default"><Plus />Tạo lịch tại quầy</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Chờ tiếp nhận" value="12" detail="Thời gian chờ trung bình 8 phút" icon={<UsersRound className="size-5" />} tone="amber" />
        <MetricCard label="Đã check-in" value="92" detail="Tăng 14 lượt so với hôm qua" trend="up" icon={<UserCheck className="size-5" />} tone="green" />
        <MetricCard label="Lịch chờ xác nhận" value="18" detail="6 lịch trong 2 giờ tới" icon={<CalendarCheck2 className="size-5" />} />
        <MetricCard label="Phòng khả dụng" value="8" detail="Trên tổng số 24 phòng" icon={<BedDouble className="size-5" />} tone="cyan" />
      </MetricGrid>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <PortalSection title="Hàng chờ hiện tại" action={<PortalAction>Gọi số tiếp theo</PortalAction>}>
          <PortalTable caption="Hàng chờ tiếp nhận" columns={["Số", "Bệnh nhân", "Giờ hẹn", "Khu vực", "Trạng thái"]} rows={queueRows} />
        </PortalSection>
        <PortalSection title="Tiến độ ca sáng">
          <ProgressList items={[
            { label: "Đã tiếp nhận", value: 74, display: "92/124", color: "bg-emerald-500" },
            { label: "Đang chờ", value: 18, display: "12 lượt", color: "bg-amber-500" },
            { label: "Vắng mặt", value: 7, display: "8 lượt", color: "bg-red-400" },
          ]} />
        </PortalSection>
      </div>
    </div>
  );
}

function StaffAppointmentsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Điều phối lịch" title="Lịch hẹn" description="Tạo lịch thay bệnh nhân, xác nhận, đổi lịch, phân phòng và hủy có lý do." actions={<PortalAction variant="default"><Plus />Tạo lịch mới</PortalAction>} />
      <MetricGrid>
        <MetricCard label="Lịch hôm nay" value="148" detail="3 loại lịch" icon={<CalendarCheck2 className="size-5" />} />
        <MetricCard label="Chờ xác nhận" value="18" detail="6 lịch trong 2 giờ tới" icon={<Clock3 className="size-5" />} tone="amber" />
        <MetricCard label="Đã xác nhận" value="118" detail="79,7% tổng lịch" icon={<CheckCircle2 className="size-5" />} tone="green" />
        <MetricCard label="Cần gán phòng" value="7" detail="Ưu tiên khung 09:30 - 11:00" icon={<BedDouble className="size-5" />} tone="red" />
      </MetricGrid>
      <PortalSection title="Danh sách lịch">
        <PortalToolbar placeholder="Tìm tên, mã lịch hoặc mã y tế" filters={[{ label: "Hôm nay", options: ["Ngày mai", "7 ngày"] }, { label: "Trạng thái", options: ["Chờ xác nhận", "Đã xác nhận", "Đã check-in", "Đã hủy"] }, { label: "Loại lịch", options: ["Bệnh viện", "Bác sĩ", "Dịch vụ"] }]} />
        <PortalTable caption="Lịch hẹn tại chi nhánh" columns={["Mã lịch", "Bệnh nhân", "Thời gian", "Nội dung", "Phòng", "Trạng thái"]} rows={[
          ["APT-10248", "Nguyễn Thị Lan", "09:30", "BS. Nguyễn Hoàng Minh", "P.203", <StatusPill key="1" tone="blue">Đã check-in</StatusPill>],
          ["APT-10249", "Trần Văn Phúc", "09:45", "Khám tổng quát", "Chưa gán", <StatusPill key="2" tone="amber">Chờ xác nhận</StatusPill>],
          ["APT-10250", "Lê Minh Châu", "09:45", "Siêu âm tổng quát", "P.307", <StatusPill key="3" tone="green">Đã xác nhận</StatusPill>],
          ["APT-10251", "Phạm Thị Hồng", "10:00", "BS. Phạm Ngọc Anh", "P.205", <StatusPill key="4" tone="green">Đã xác nhận</StatusPill>],
        ]} />
      </PortalSection>
    </div>
  );
}

function ReceptionScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Tiếp nhận tại quầy" title="Check-in người bệnh" description="Tìm lịch hợp lệ, xác nhận người đến khám và chuyển vào hàng chờ của phòng." />
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <PortalSection title="Tra cứu lịch hẹn" description="Nhập mã lịch, mã y tế hoặc số điện thoại.">
          <form className="space-y-4 p-5">
            <div className="space-y-2"><Label htmlFor="reception-search">Thông tin tra cứu</Label><Input id="reception-search" placeholder="Ví dụ: APT-10248" defaultValue="APT-10248" /></div>
            <PortalAction variant="default">Tra cứu lịch</PortalAction>
          </form>
        </PortalSection>
        <PortalSection title="Kết quả tra cứu" action={<StatusPill tone="green">Có thể check-in</StatusPill>}>
          <DetailGrid>
            <DetailItem label="Bệnh nhân" value="Nguyễn Thị Lan" />
            <DetailItem label="Mã y tế" value="BN-10248" />
            <DetailItem label="Thời gian" value="09:30 · 23/09/2026" />
            <DetailItem label="Nội dung" value="Khám BS. Nguyễn Hoàng Minh" />
            <DetailItem label="Phòng" value="P.203 · Khu B, tầng 2" />
            <DetailItem label="Trạng thái" value={<StatusPill tone="blue">Đã xác nhận</StatusPill>} />
          </DetailGrid>
          <div className="flex flex-wrap justify-end gap-2 border-t p-5"><PortalAction>Đổi phòng</PortalAction><PortalAction variant="default"><UserCheck />Xác nhận check-in</PortalAction></div>
        </PortalSection>
      </div>
      <PortalSection title="Hàng chờ sau check-in">
        <PortalTable caption="Hàng chờ sau check-in" columns={["Số", "Bệnh nhân", "Giờ hẹn", "Khu vực", "Trạng thái"]} rows={queueRows} />
      </PortalSection>
    </div>
  );
}

function StaffRoomsScreen() {
  const rooms = [
    ["P.101", "Nội tổng quát", "Khả dụng", "0", "Sẵn sàng"],
    ["P.203", "Tim mạch", "Đang sử dụng", "2", "BS. Nguyễn Hoàng Minh"],
    ["P.205", "Nhi khoa", "Đang sử dụng", "3", "BS. Phạm Ngọc Anh"],
    ["P.307", "Chẩn đoán hình ảnh", "Bảo trì", "0", "Dự kiến xong 14:00"],
    ["P.108", "Xét nghiệm", "Khả dụng", "1", "Sẵn sàng"],
    ["P.210", "Cơ xương khớp", "Đang sử dụng", "4", "BS. Trần Thanh Vũ"],
  ];
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Sơ đồ vận hành" title="Tình trạng phòng khám" description="Theo dõi phòng khả dụng, phòng đang sử dụng và hàng chờ hiện tại." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rooms.map(([room, department, status, waiting, note]) => (
          <article key={room} className="border bg-white p-5">
            <div className="flex items-start justify-between"><div><p className="text-lg font-bold text-[#173b57]">{room}</p><p className="mt-1 text-sm text-muted-foreground">{department}</p></div><StatusPill tone={status === "Khả dụng" ? "green" : status === "Bảo trì" ? "amber" : "blue"}>{status}</StatusPill></div>
            <div className="mt-5 flex items-end justify-between border-t pt-4"><div><p className="text-xs text-muted-foreground">Đang chờ</p><p className="mt-1 text-xl font-bold">{waiting}</p></div><p className="max-w-36 text-right text-xs leading-5 text-muted-foreground">{note}</p></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PaymentDispensingScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Đơn thuốc tại quầy" title="Thanh toán và cấp thuốc" description="Thu tiền và cấp thuốc theo đơn đã được bác sĩ tạo; không chỉnh sửa nội dung đơn." />
      <MetricGrid>
        <MetricCard label="Chờ thanh toán" value="12" detail="Tổng tạm tính 3,8 triệu" icon={<CircleDollarSign className="size-5" />} tone="amber" />
        <MetricCard label="Chờ cấp thuốc" value="8" detail="3 đơn có thuốc sắp hết" icon={<PackageCheck className="size-5" />} />
        <MetricCard label="Hoàn tất hôm nay" value="58" detail="Tổng giá trị 18,6 triệu" trend="up" icon={<CheckCircle2 className="size-5" />} tone="green" />
        <MetricCard label="Thời gian trung bình" value="6 phút" detail="Từ thanh toán đến cấp thuốc" icon={<Clock3 className="size-5" />} tone="cyan" />
      </MetricGrid>
      <PortalSection title="Hàng chờ xử lý">
        <PortalToolbar placeholder="Tìm mã đơn, bệnh nhân hoặc mã y tế" filters={[{ label: "Tất cả trạng thái", options: ["Chờ thanh toán", "Chờ cấp thuốc", "Đã hoàn tất"] }]} />
        <PortalTable caption="Đơn chờ thanh toán và cấp thuốc" columns={["Mã đơn", "Bệnh nhân", "Số thuốc", "Tổng tiền", "Kho", "Trạng thái"]} rows={[
          ["RX-260923-074", "Nguyễn Thị Lan", "3", "486.000 đ", <StatusPill key="1" tone="green">Đủ thuốc</StatusPill>, <StatusPill key="2" tone="amber">Chờ thanh toán</StatusPill>],
          ["RX-260923-073", "Lê Minh Châu", "2", "328.000 đ", <StatusPill key="3" tone="green">Đủ thuốc</StatusPill>, <StatusPill key="4" tone="blue">Chờ cấp thuốc</StatusPill>],
          ["RX-260923-071", "Phạm Minh Đức", "4", "625.000 đ", <StatusPill key="5" tone="amber">1 thuốc ngoài</StatusPill>, <StatusPill key="6" tone="amber">Chờ thanh toán</StatusPill>],
          ["RX-260923-068", "Trần Thu Hương", "1", "86.000 đ", <StatusPill key="7" tone="green">Đủ thuốc</StatusPill>, <StatusPill key="8" tone="green">Đã hoàn tất</StatusPill>],
        ]} />
      </PortalSection>
    </div>
  );
}

function StaffReviewsScreen() {
  return (
    <div className="space-y-6">
      <PortalPageHeader eyebrow="Quyền được giao" title="Hỗ trợ kiểm duyệt đánh giá" description="Đánh dấu đã xem và ẩn nội dung vi phạm theo quyền được quản trị viên chi nhánh cấp." />
      <PortalSection title="Đánh giá chưa xem" description="12 đánh giá đang chờ xử lý">
        <PortalToolbar placeholder="Tìm nội dung" filters={[{ label: "Tất cả số sao", options: ["5 sao", "4 sao", "1-3 sao"] }]} />
        <PortalTable caption="Đánh giá chưa xem" columns={["Người đánh giá", "Đối tượng", "Nội dung", "Điểm", "Ngày tạo"]} rows={[
          ["Nguyễn T. L.", "BS. Nguyễn Hoàng Minh", "Bác sĩ tư vấn kỹ, dễ hiểu.", <StatusPill key="1" tone="green">5 sao</StatusPill>, "23/09 09:20"],
          ["Trần V. P.", "Siêu âm tổng quát", "Thời gian chờ hơi lâu.", <StatusPill key="2" tone="green">4 sao</StatusPill>, "23/09 08:42"],
          ["Lê M. C.", "BV Đa khoa Thành Phố", "Quy trình tiếp nhận thuận tiện.", <StatusPill key="3" tone="green">5 sao</StatusPill>, "22/09 18:10"],
          ["Phạm T. H.", "Khoa Nhi", "Khó tìm khu vực phòng khám.", <StatusPill key="4" tone="amber">2 sao</StatusPill>, "22/09 16:34"],
        ]} />
      </PortalSection>
    </div>
  );
}
