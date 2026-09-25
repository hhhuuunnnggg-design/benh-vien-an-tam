import { ImportTicketStatus, type ImportTicket } from "@/types/models";

export const mockImportTickets: ImportTicket[] = [
  {
    Uuid: "bc4fcc5d-5421-4ae6-81ca-e6bc4c791101",
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    AccountUuid: "2a9a4604-aa8a-4f39-84ea-f6cb613884be",
    ProviderUuid: "fa625aa7-0a4c-4fa8-b39e-c4950e561101",
    Note: "Nhập thuốc bổ sung định kỳ.",
    Status: ImportTicketStatus.Confirmed,
    CreatedAt: new Date("2026-09-18T02:00:00.000Z"),
    UpdatedAt: new Date("2026-09-18T04:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "bc4fcc5d-5421-4ae6-81ca-e6bc4c791102",
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    AccountUuid: "2a9a4604-aa8a-4f39-84ea-f6cb613884be",
    ProviderUuid: "fa625aa7-0a4c-4fa8-b39e-c4950e561101",
    Note: "Phiếu đang chờ xác nhận.",
    Status: ImportTicketStatus.Pending,
    CreatedAt: new Date("2026-09-21T02:00:00.000Z"),
    UpdatedAt: new Date("2026-09-21T02:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "bc4fcc5d-5421-4ae6-81ca-e6bc4c791103",
    HospitalUuid: "f02f7063-adc4-47ae-9a42-02ca5adff369",
    AccountUuid: "ec52c5f3-411d-472e-8df4-d5d17e5a540e",
    ProviderUuid: "fa625aa7-0a4c-4fa8-b39e-c4950e561102",
    Note: "Phiếu đã hủy do thay đổi nhà cung cấp.",
    Status: ImportTicketStatus.Cancelled,
    CreatedAt: new Date("2026-08-20T02:00:00.000Z"),
    UpdatedAt: new Date("2026-08-21T02:00:00.000Z"),
    DeletedAt: new Date(0),
  },
];
