import { ProviderStatus, type Provider } from "@/types/models";

export const mockProviders: Provider[] = [
  {
    Uuid: "fa625aa7-0a4c-4fa8-b39e-c4950e561101",
    Name: "Công ty Dược An Tâm",
    Address: "12 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh",
    Hotline: "02873001234",
    Status: ProviderStatus.Active,
    CreatedAt: new Date("2025-01-10T00:00:00.000Z"),
    UpdatedAt: new Date("2026-08-20T00:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "fa625aa7-0a4c-4fa8-b39e-c4950e561102",
    Name: "Nhà phân phối Minh Phúc",
    Address: "85 Lê Duẩn, Hải Châu, Đà Nẵng",
    Hotline: "02367300123",
    Status: ProviderStatus.InActive,
    CreatedAt: new Date("2025-03-15T00:00:00.000Z"),
    UpdatedAt: new Date("2026-07-01T00:00:00.000Z"),
    DeletedAt: new Date(0),
  },
];
