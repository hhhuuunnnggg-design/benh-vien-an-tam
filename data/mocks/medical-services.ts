import { BaseStatus, type MedicalService } from "@/types/models";

export const mockMedicalServices: MedicalService[] = [
  {
    Uuid: "227a9731-1a64-41c5-a934-ef464fc4d416",
    Image: "/images/service-placeholder.svg",
    Slug: "kham-suc-khoe-tong-quat",
    Name: "Khám sức khỏe tổng quát",
    Price: 1200000,
    Description:
      "**Khám sức khỏe tổng quát** giúp ghi nhận các chỉ số cơ bản, phát hiện dấu hiệu nguy cơ và xây dựng kế hoạch theo dõi phù hợp. Danh mục được thực hiện theo quy trình của cơ sở và tình trạng thực tế của người khám.\n\n- Đánh giá tiền sử và các vấn đề sức khỏe đang quan tâm\n- Khám lâm sàng tổng quát\n- Tư vấn kết quả và hướng theo dõi tiếp theo",
    DetailService:
      "**Trước khi thực hiện**\n\n- Chuẩn bị giấy tờ, hồ sơ khám và đơn thuốc gần nhất\n- Nhịn ăn nếu cơ sở xác nhận danh mục có xét nghiệm cần chuẩn bị\n- Ghi lại triệu chứng hoặc câu hỏi cần trao đổi\n\n**Quy trình dự kiến**\n\n1. Tiếp nhận và xác nhận danh mục kiểm tra\n2. Khám lâm sàng và thực hiện chỉ định cơ bản\n3. Tổng hợp kết quả, tư vấn và hướng dẫn theo dõi\n\nDanh mục cụ thể có thể được điều chỉnh theo đánh giá chuyên môn tại cơ sở.",
    WorkingHour: "Thứ Hai - Thứ Bảy, 07:00 - 11:30",
    Status: BaseStatus.Active,
    IsInsured: true,
    InsuranceCap: 0.8,
    IsFeatured: true,
    CreatedAt: new Date("2025-02-01T00:00:00.000Z"),
    UpdatedAt: new Date("2026-08-19T00:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "d531fbd6-998a-49df-9e68-4388b8bf388b",
    Image: "/images/service-placeholder.svg",
    Slug: "sieu-am-tong-quat",
    Name: "Siêu âm tổng quát",
    Price: 450000,
    Description:
      "**Siêu âm tổng quát** sử dụng hình ảnh để hỗ trợ khảo sát cơ quan theo vùng được chỉ định. Kết quả là một phần thông tin giúp bác sĩ đánh giá cùng triệu chứng và các xét nghiệm liên quan.\n\n- Thực hiện không xâm lấn\n- Hỗ trợ khảo sát hình thái cơ quan\n- Có kết quả theo quy trình của cơ sở",
    DetailService:
      "**Chuẩn bị**\n\nTùy vùng khảo sát, người thực hiện có thể được hướng dẫn nhịn ăn, uống nước hoặc chuẩn bị riêng. Cần xác nhận lại với cơ sở sau khi đặt lịch.\n\n**Các bước dự kiến**\n\n1. Kiểm tra thông tin và chỉ định\n2. Chuẩn bị tư thế phù hợp với vùng khảo sát\n3. Thực hiện siêu âm bởi nhân sự chuyên môn\n4. Nhận kết quả và hướng dẫn trao đổi với bác sĩ\n\nThời lượng có thể thay đổi theo nội dung cần khảo sát.",
    WorkingHour: "Thứ Hai - Thứ Bảy, 08:00 - 16:30",
    Status: BaseStatus.Active,
    IsInsured: true,
    InsuranceCap: 0.7,
    IsFeatured: true,
    CreatedAt: new Date("2025-02-02T00:00:00.000Z"),
    UpdatedAt: new Date("2026-08-17T00:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "6fb2fb37-cf96-4926-b66a-bf81cce5ecb3",
    Image: "/images/service-placeholder.svg",
    Slug: "xet-nghiem-duong-huyet",
    Name: "Xét nghiệm đường huyết",
    Price: 180000,
    Description:
      "**Xét nghiệm đường huyết** đo nồng độ glucose trong mẫu máu, hỗ trợ theo dõi sức khỏe chuyển hóa và đánh giá nguy cơ theo chỉ định. Kết quả cần được diễn giải cùng thời điểm lấy mẫu, triệu chứng và tiền sử.\n\n- Hỗ trợ kiểm tra đường huyết\n- Phù hợp cho theo dõi định kỳ theo hướng dẫn\n- Trả kết quả theo quy trình của cơ sở",
    DetailService:
      "**Lưu ý chuẩn bị**\n\n- Xác nhận loại xét nghiệm có yêu cầu nhịn ăn hay không\n- Thông báo thuốc đang dùng và thời điểm dùng gần nhất\n- Không tự ý ngừng thuốc nếu chưa có hướng dẫn chuyên môn\n\n**Quy trình**\n\n1. Tiếp nhận và đối chiếu thông tin\n2. Lấy mẫu theo quy trình an toàn\n3. Phân tích và trả kết quả\n4. Trao đổi với bác sĩ nếu chỉ số nằm ngoài khoảng tham chiếu",
    WorkingHour: "Thứ Hai - Chủ Nhật, 07:00 - 10:00",
    Status: BaseStatus.Active,
    IsInsured: true,
    InsuranceCap: 0.8,
    IsFeatured: true,
    CreatedAt: new Date("2025-02-03T00:00:00.000Z"),
    UpdatedAt: new Date("2026-08-15T00:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "90f03176-14b8-4daa-bd19-5a56d9f35a04",
    Image: "/images/service-placeholder.svg",
    Slug: "soi-da-va-tu-van-da-lieu",
    Name: "Soi da và tư vấn da liễu",
    Price: 300000,
    Description:
      "**Soi da và tư vấn da liễu** hỗ trợ quan sát bề mặt da, ghi nhận vấn đề đang gặp và xây dựng hướng chăm sóc phù hợp. Thông tin từ thiết bị được kết hợp với thăm khám trực tiếp và tiền sử sử dụng sản phẩm.\n\n- Đánh giá tình trạng da hiện tại\n- Đối chiếu thói quen và sản phẩm đang dùng\n- Tư vấn chăm sóc theo nhu cầu cụ thể",
    DetailService:
      "**Trước buổi khám**\n\n- Hạn chế trang điểm dày tại vùng cần kiểm tra\n- Mang danh sách sản phẩm, thuốc bôi và thuốc uống đang dùng\n- Chuẩn bị hình ảnh diễn tiến nếu tình trạng thay đổi theo thời gian\n\n**Nội dung thực hiện**\n\n1. Khai thác vấn đề và thói quen chăm sóc\n2. Quan sát, thăm khám và soi da khi phù hợp\n3. Giải thích tình trạng và hướng chăm sóc\n4. Hẹn thời điểm theo dõi nếu cần",
    WorkingHour: "Thứ Hai - Thứ Bảy, 08:00 - 17:00",
    Status: BaseStatus.Active,
    IsInsured: false,
    InsuranceCap: 0,
    IsFeatured: false,
    CreatedAt: new Date("2025-02-04T00:00:00.000Z"),
    UpdatedAt: new Date("2026-08-14T00:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "53f43a59-29e4-4a62-9472-bbdd79e3e905",
    Image: "/images/service-placeholder.svg",
    Slug: "tam-soat-suc-khoe-dinh-ky",
    Name: "Tầm soát sức khỏe định kỳ",
    Price: 850000,
    Description:
      "**Tầm soát sức khỏe định kỳ** hỗ trợ theo dõi sự thay đổi của các chỉ số quan trọng theo thời gian. Gói kiểm tra phù hợp với người muốn chủ động rà soát nguy cơ và chuẩn bị dữ liệu cho kế hoạch chăm sóc dài hạn.\n\n- Ghi nhận chỉ số sức khỏe cơ bản\n- Hỗ trợ nhận diện yếu tố cần theo dõi thêm\n- Tư vấn mốc kiểm tra tiếp theo",
    DetailService:
      "**Chuẩn bị hồ sơ**\n\n- Kết quả khám hoặc xét nghiệm kỳ trước\n- Danh sách thuốc và thực phẩm bổ sung đang dùng\n- Thông tin tiền sử cá nhân và gia đình\n\n**Quy trình dự kiến**\n\n1. Xác nhận danh mục theo độ tuổi và nhu cầu\n2. Khám, đo chỉ số và thực hiện xét nghiệm liên quan\n3. Tổng hợp kết quả\n4. Tư vấn yếu tố nguy cơ và lịch theo dõi\n\nPhạm vi chính xác được cơ sở xác nhận trước khi thực hiện.",
    WorkingHour: "Thứ Hai - Chủ Nhật, 07:30 - 11:30",
    Status: BaseStatus.Active,
    IsInsured: true,
    InsuranceCap: 0.6,
    IsFeatured: false,
    CreatedAt: new Date("2025-02-05T00:00:00.000Z"),
    UpdatedAt: new Date("2026-08-13T00:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "b526a1de-5eb7-4b35-85d9-11239bc83a06",
    Image: "/images/service-placeholder.svg",
    Slug: "dich-vu-tam-ngung",
    Name: "Dịch vụ tạm ngưng",
    Price: 100000,
    Description: "Dịch vụ không còn hiển thị công khai.",
    DetailService: "Đang cập nhật.",
    WorkingHour: "Đang cập nhật",
    Status: BaseStatus.InActive,
    IsInsured: false,
    InsuranceCap: 0,
    IsFeatured: false,
    CreatedAt: new Date("2025-02-06T00:00:00.000Z"),
    UpdatedAt: new Date("2026-08-10T00:00:00.000Z"),
    DeletedAt: new Date(0),
  },
];

export const featuredMedicalServices = mockMedicalServices
  .filter((service) => service.Status === BaseStatus.Active && service.IsFeatured);
