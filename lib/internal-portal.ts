export const internalRoleSlugs = [
  "system-admin",
  "hospital-admin",
  "doctor",
  "staff",
  "warehouse-manager",
] as const;

export type InternalRoleSlug = (typeof internalRoleSlugs)[number];

export type PortalNavigationItem = {
  slug: string;
  label: string;
  description: string;
  icon: PortalIconName;
};

export type PortalIconName =
  | "dashboard"
  | "hospital"
  | "department"
  | "service"
  | "medicine"
  | "account"
  | "report"
  | "audit"
  | "room"
  | "appointment"
  | "prescription"
  | "review"
  | "patient"
  | "profile"
  | "payment"
  | "inventory"
  | "alert"
  | "provider"
  | "ticket"
  | "history";

export type InternalPortalDefinition = {
  role: string;
  name: string;
  scope: string;
  description: string;
  navigation: PortalNavigationItem[];
};

const dashboard = (description: string): PortalNavigationItem => ({
  slug: "tong-quan",
  label: "Tổng quan",
  description,
  icon: "dashboard",
});

export const internalPortals: Record<InternalRoleSlug, InternalPortalDefinition> = {
  "system-admin": {
    role: "SYSTEM_ADMIN",
    name: "Quản trị hệ thống",
    scope: "Toàn hệ thống",
    description: "Vận hành nền tảng đa chi nhánh và quản lý dữ liệu dùng chung.",
    navigation: [
      dashboard("Theo dõi tình trạng vận hành và dữ liệu tổng hợp toàn hệ thống."),
      { slug: "co-so-y-te", label: "Cơ sở y tế", description: "Quản lý chi nhánh và trạng thái hoạt động trên toàn hệ thống.", icon: "hospital" },
      { slug: "chuyen-khoa", label: "Chuyên khoa", description: "Quản lý danh mục chuyên khoa gốc dùng chung.", icon: "department" },
      { slug: "dich-vu", label: "Dịch vụ", description: "Quản lý danh mục dịch vụ y tế gốc dùng chung.", icon: "service" },
      { slug: "thuoc", label: "Danh mục thuốc", description: "Quản lý danh mục thuốc dùng chung giữa các chi nhánh.", icon: "medicine" },
      { slug: "tai-khoan", label: "Tài khoản", description: "Quản lý tài khoản và quản trị viên chi nhánh.", icon: "account" },
      { slug: "bao-cao", label: "Báo cáo hệ thống", description: "Xem báo cáo tổng hợp không bao gồm nội dung lâm sàng chi tiết.", icon: "report" },
      { slug: "nhat-ky-he-thong", label: "Nhật ký hệ thống", description: "Theo dõi audit log và các hành động quản trị quan trọng.", icon: "audit" },
    ],
  },
  "hospital-admin": {
    role: "HOSPITAL_ADMIN",
    name: "Quản trị chi nhánh",
    scope: "Chi nhánh của tài khoản",
    description: "Điều phối nhân sự, lịch khám và hoạt động của một chi nhánh.",
    navigation: [
      dashboard("Theo dõi hoạt động khám chữa bệnh và vận hành trong chi nhánh."),
      { slug: "thong-tin-chi-nhanh", label: "Thông tin chi nhánh", description: "Cập nhật thông tin và giờ làm việc của chi nhánh.", icon: "hospital" },
      { slug: "chuyen-khoa-dich-vu", label: "Chuyên khoa & dịch vụ", description: "Gán chuyên khoa và dịch vụ có sẵn cho chi nhánh.", icon: "department" },
      { slug: "phong-kham", label: "Phòng khám", description: "Quản lý phòng và trạng thái sử dụng trong chi nhánh.", icon: "room" },
      { slug: "nhan-su", label: "Nhân sự", description: "Quản lý tài khoản nhân sự thuộc phạm vi chi nhánh.", icon: "account" },
      { slug: "lich-hen", label: "Lịch hẹn", description: "Theo dõi, xác nhận, điều phối và hủy lịch thuộc chi nhánh.", icon: "appointment" },
      { slug: "don-thuoc", label: "Đơn thuốc", description: "Xem đơn thuốc khi cần xử lý nghiệp vụ được phân quyền.", icon: "prescription" },
      { slug: "kho-thuoc", label: "Kho thuốc", description: "Theo dõi tồn kho và duyệt phiếu nhập xuất của chi nhánh.", icon: "inventory" },
      { slug: "danh-gia", label: "Đánh giá", description: "Kiểm duyệt đánh giá liên quan đến chi nhánh.", icon: "review" },
      { slug: "bao-cao", label: "Báo cáo", description: "Xem báo cáo vận hành và tài chính trong phạm vi chi nhánh.", icon: "report" },
      { slug: "nhat-ky", label: "Nhật ký hoạt động", description: "Theo dõi audit log của chi nhánh.", icon: "audit" },
    ],
  },
  doctor: {
    role: "DOCTOR",
    name: "Cổng bác sĩ",
    scope: "Ca khám được phân công",
    description: "Xử lý chuyên môn cho lịch khám và bệnh nhân được phân công.",
    navigation: [
      dashboard("Theo dõi lịch khám và công việc chuyên môn được phân công."),
      { slug: "lich-kham", label: "Lịch khám", description: "Xem lịch khám được phân công và đề xuất thay đổi khi cần.", icon: "appointment" },
      { slug: "ca-kham", label: "Ca khám", description: "Xem thông tin tối thiểu của bệnh nhân và hoàn thành ca khám.", icon: "patient" },
      { slug: "don-thuoc", label: "Đơn thuốc", description: "Tạo và quản lý đơn thuốc chưa thanh toán do chính bác sĩ kê.", icon: "prescription" },
      { slug: "thuoc-kha-dung", label: "Thuốc khả dụng", description: "Tra cứu khả dụng của thuốc tại chi nhánh để hỗ trợ kê đơn.", icon: "medicine" },
      { slug: "ho-so-nghe-nghiep", label: "Hồ sơ nghề nghiệp", description: "Cập nhật phần thông tin nghề nghiệp được cho phép.", icon: "profile" },
    ],
  },
  staff: {
    role: "STAFF",
    name: "Cổng tiếp nhận",
    scope: "Chi nhánh của tài khoản",
    description: "Tiếp nhận người bệnh và vận hành lịch khám tại chi nhánh.",
    navigation: [
      dashboard("Theo dõi lịch hẹn, lượt chờ và tình trạng phòng trong ngày."),
      { slug: "lich-hen", label: "Lịch hẹn", description: "Tạo lịch thay bệnh nhân, xác nhận, đổi lịch và phân phòng.", icon: "appointment" },
      { slug: "tiep-nhan", label: "Tiếp nhận", description: "Check-in và cập nhật trạng thái vận hành của lượt khám.", icon: "patient" },
      { slug: "phong-kham", label: "Phòng khám", description: "Theo dõi và cập nhật trạng thái phòng trong chi nhánh.", icon: "room" },
      { slug: "thanh-toan-cap-thuoc", label: "Thanh toán & cấp thuốc", description: "Thu tiền và cấp thuốc theo đơn khi được giao nhiệm vụ.", icon: "payment" },
      { slug: "danh-gia", label: "Đánh giá", description: "Hỗ trợ kiểm duyệt đánh giá khi có quyền phù hợp.", icon: "review" },
    ],
  },
  "warehouse-manager": {
    role: "WAREHOUSE_MANAGER",
    name: "Quản lý kho thuốc",
    scope: "Kho của chi nhánh",
    description: "Quản lý tồn kho, nhà cung cấp và luồng nhập xuất thuốc.",
    navigation: [
      dashboard("Theo dõi tồn kho, cảnh báo và hoạt động nhập xuất gần đây."),
      { slug: "ton-kho", label: "Tồn kho", description: "Xem số lượng thuốc hiện có trong kho chi nhánh.", icon: "inventory" },
      { slug: "canh-bao", label: "Cảnh báo tồn", description: "Cấu hình ngưỡng tối thiểu và theo dõi thuốc sắp hết.", icon: "alert" },
      { slug: "nha-cung-cap", label: "Nhà cung cấp", description: "Quản lý thông tin nhà cung cấp trong phạm vi được giao.", icon: "provider" },
      { slug: "phieu-nhap-xuat", label: "Phiếu nhập xuất", description: "Tạo, sửa hoặc hủy phiếu khi còn chờ duyệt.", icon: "ticket" },
      { slug: "dieu-chinh-ton", label: "Điều chỉnh tồn", description: "Điều chỉnh tồn kho với lý do bắt buộc và audit log.", icon: "medicine" },
      { slug: "lich-su", label: "Lịch sử kho", description: "Tra cứu lịch sử nhập, xuất và biến động tồn kho.", icon: "history" },
      { slug: "bao-cao", label: "Báo cáo kho", description: "Xem báo cáo nhập, xuất, tồn và giá trị kho của chi nhánh.", icon: "report" },
    ],
  },
};

export function isInternalRoleSlug(value: string): value is InternalRoleSlug {
  return internalRoleSlugs.includes(value as InternalRoleSlug);
}

export function getInternalPortal(value: string) {
  return isInternalRoleSlug(value) ? internalPortals[value] : undefined;
}

export function getInternalPortalPage(role: string, slug: string) {
  return getInternalPortal(role)?.navigation.find((item) => item.slug === slug);
}
