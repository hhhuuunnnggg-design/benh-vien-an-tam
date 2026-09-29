using api.Model;

namespace api.Data.Seed;

public static class PermissionSeed
{
    public static IReadOnlyList<Permission> Permissions { get; } =
    [
        Create("00000000-0000-0000-0000-000000000001", "dashboard", "tong-quan-he-thong", "Theo dõi tình trạng vận hành và dữ liệu tổng hợp toàn hệ thống."), // tong-quan-he-thong
        Create("00000000-0000-0000-0000-000000000002", "hospital", "co-so-y-te", "Quản lý chi nhánh và trạng thái hoạt động trên toàn hệ thống."), // co-so-y-te
        Create("00000000-0000-0000-0000-000000000003", "department", "chuyen-khoa", "Quản lý danh mục chuyên khoa gốc dùng chung."), // chuyen-khoa
        Create("00000000-0000-0000-0000-000000000004", "service", "dich-vu", "Quản lý danh mục dịch vụ y tế gốc dùng chung."), // dich-vu
        Create("00000000-0000-0000-0000-000000000005", "medicine", "thuoc", "Quản lý danh mục thuốc dùng chung giữa các chi nhánh."), // thuoc
        Create("00000000-0000-0000-0000-000000000006", "account", "tai-khoan", "Quản lý tài khoản và quản trị viên chi nhánh."), // tai-khoan
        Create("00000000-0000-0000-0000-000000000007", "report", "bao-cao-he-thong", "Xem báo cáo tổng hợp không bao gồm nội dung lâm sàng chi tiết."), // bao-cao-he-thong
        Create("00000000-0000-0000-0000-000000000008", "audit", "nhat-ky-he-thong", "Theo dõi audit log và các hành động quản trị quan trọng."), // nhat-ky-he-thong
        Create("00000000-0000-0000-0000-000000000009", "dashboard", "tong-quan-chi-nhanh", "Theo dõi hoạt động khám chữa bệnh và vận hành trong chi nhánh."), // tong-quan-chi-nhanh
        Create("00000000-0000-0000-0000-000000000010", "hospital", "thong-tin-chi-nhanh", "Cập nhật thông tin và giờ làm việc của chi nhánh."), // thong-tin-chi-nhanh
        Create("00000000-0000-0000-0000-000000000011", "department", "chuyen-khoa-dich-vu", "Gán chuyên khoa và dịch vụ có sẵn cho chi nhánh."), // chuyen-khoa-dich-vu
        Create("00000000-0000-0000-0000-000000000012", "room", "phong-kham-chi-nhanh", "Quản lý phòng và trạng thái sử dụng trong chi nhánh."), // phong-kham-chi-nhanh
        Create("00000000-0000-0000-0000-000000000013", "account", "nhan-su", "Quản lý tài khoản nhân sự thuộc phạm vi chi nhánh."), // nhan-su
        Create("00000000-0000-0000-0000-000000000014", "appointment", "lich-hen-chi-nhanh", "Theo dõi, xác nhận, điều phối và hủy lịch thuộc chi nhánh."), // lich-hen-chi-nhanh
        Create("00000000-0000-0000-0000-000000000015", "prescription", "don-thuoc-chi-nhanh", "Xem đơn thuốc khi cần xử lý nghiệp vụ được phân quyền."), // don-thuoc-chi-nhanh
        Create("00000000-0000-0000-0000-000000000016", "inventory", "kho-thuoc", "Theo dõi tồn kho và duyệt phiếu nhập xuất của chi nhánh."), // kho-thuoc
        Create("00000000-0000-0000-0000-000000000017", "review", "danh-gia-chi-nhanh", "Kiểm duyệt đánh giá liên quan đến chi nhánh."), // danh-gia-chi-nhanh
        Create("00000000-0000-0000-0000-000000000018", "report", "bao-cao-chi-nhanh", "Xem báo cáo vận hành và tài chính trong phạm vi chi nhánh."), // bao-cao-chi-nhanh
        Create("00000000-0000-0000-0000-000000000019", "audit", "nhat-ky-chi-nhanh", "Theo dõi audit log của chi nhánh."), // nhat-ky-chi-nhanh
        Create("00000000-0000-0000-0000-000000000020", "dashboard", "tong-quan-bac-si", "Theo dõi lịch khám và công việc chuyên môn được phân công."), // tong-quan-bac-si
        Create("00000000-0000-0000-0000-000000000021", "appointment", "lich-kham", "Xem lịch khám được phân công và đề xuất thay đổi khi cần."), // lich-kham
        Create("00000000-0000-0000-0000-000000000022", "patient", "ca-kham", "Xem thông tin tối thiểu của bệnh nhân và hoàn thành ca khám."), // ca-kham
        Create("00000000-0000-0000-0000-000000000023", "prescription", "don-thuoc-bac-si", "Tạo và quản lý đơn thuốc chưa thanh toán."), // don-thuoc-bac-si
        Create("00000000-0000-0000-0000-000000000024", "medicine", "thuoc-kha-dung", "Tra cứu khả dụng của thuốc tại chi nhánh để hỗ trợ kê đơn."), // thuoc-kha-dung
        Create("00000000-0000-0000-0000-000000000025", "profile", "ho-so-nghe-nghiep", "Cập nhật phần thông tin nghề nghiệp được cho phép."), // ho-so-nghe-nghiep
        Create("00000000-0000-0000-0000-000000000026", "dashboard", "tong-quan-tiep-nhan", "Theo dõi lịch hẹn, lượt chờ và tình trạng phòng trong ngày."), // tong-quan-tiep-nhan
        Create("00000000-0000-0000-0000-000000000027", "appointment", "lich-hen-tiep-nhan", "Tạo lịch thay bệnh nhân, xác nhận, đổi lịch và phân phòng."), // lich-hen-tiep-nhan
        Create("00000000-0000-0000-0000-000000000028", "patient", "tiep-nhan", "Check-in và cập nhật trạng thái vận hành của lượt khám."), // tiep-nhan
        Create("00000000-0000-0000-0000-000000000029", "room", "phong-kham-tiep-nhan", "Theo dõi và cập nhật trạng thái phòng trong chi nhánh."), // phong-kham-tiep-nhan
        Create("00000000-0000-0000-0000-000000000030", "payment", "thanh-toan-cap-thuoc", "Thu tiền và cấp thuốc theo đơn khi được giao nhiệm vụ."), // thanh-toan-cap-thuoc
        Create("00000000-0000-0000-0000-000000000031", "review", "danh-gia-tiep-nhan", "Hỗ trợ kiểm duyệt đánh giá khi có quyền phù hợp."), // danh-gia-tiep-nhan
        Create("00000000-0000-0000-0000-000000000032", "dashboard", "tong-quan-kho", "Theo dõi tồn kho, cảnh báo và hoạt động nhập xuất gần đây."), // tong-quan-kho
        Create("00000000-0000-0000-0000-000000000033", "inventory", "ton-kho", "Xem số lượng thuốc hiện có trong kho chi nhánh."), // ton-kho
        Create("00000000-0000-0000-0000-000000000035", "provider", "nha-cung-cap", "Quản lý thông tin nhà cung cấp trong phạm vi được giao."), // nha-cung-cap
        Create("00000000-0000-0000-0000-000000000036", "ticket", "phieu-nhap-xuat", "Tạo, sửa hoặc hủy phiếu khi còn chờ duyệt."), // phieu-nhap-xuat
        Create("00000000-0000-0000-0000-000000000037", "medicine", "dieu-chinh-ton", "Điều chỉnh tồn kho với lý do bắt buộc và audit log."), // dieu-chinh-ton
        Create("00000000-0000-0000-0000-000000000038", "history", "lich-su", "Tra cứu lịch sử nhập, xuất và biến động tồn kho."), // lich-su
        Create("00000000-0000-0000-0000-000000000039", "report", "bao-cao-kho", "Xem báo cáo nhập, xuất, tồn và giá trị kho của chi nhánh."), // bao-cao-kho
        Create("00000000-0000-0000-0000-000000000040", "schedule", "khung-gio-lam-viec", "Quản lý danh mục khung giờ dùng chung trong hệ thống."), // khung-gio-lam-viec
        Create("00000000-0000-0000-0000-000000000041", "schedule", "gio-lam-viec-dich-vu", "Gán và cập nhật lịch thực hiện cho dịch vụ."), // gio-lam-viec-dich-vu
        Create("00000000-0000-0000-0000-000000000042", "permission", "phan-quyen", "Quản lý role và permission của cổng nội bộ."), // phan-quyen
        Create("00000000-0000-0000-0000-000000000043", "schedule", "gio-lam-viec-benh-vien", "Cập nhật lịch hoạt động của bệnh viện."), // gio-lam-viec-benh-vien
        Create("00000000-0000-0000-0000-000000000044", "schedule", "gio-lam-viec-bac-si", "Xem lịch làm việc và tạo đơn đề nghị thay đổi.") // gio-lam-viec-bac-si
    ];

    private static Permission Create(string uuid, string icon, string name, string description) => new()
    {
        Uuid = Guid.Parse(uuid),
        Icon = icon,
        Name = name,
        Description = description
    };
}
