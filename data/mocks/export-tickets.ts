import { ExportTicketStatus, type ExportTicket } from "@/types/models";

export const mockExportTickets: ExportTicket[] = [
  {
    Uuid: "6584b574-4630-48dd-b043-d7b84c9d1101",
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    AccountUuid: "2a9a4604-aa8a-4f39-84ea-f6cb613884be",
    Note: "Xuất thuốc theo nhu cầu điều trị.",
    Status: ExportTicketStatus.Confirmed,
    CreatedAt: new Date("2026-09-19T02:00:00.000Z"),
    UpdatedAt: new Date("2026-09-19T03:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "6584b574-4630-48dd-b043-d7b84c9d1102",
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    AccountUuid: "2a9a4604-aa8a-4f39-84ea-f6cb613884be",
    Note: "Phiếu xuất đang chờ duyệt.",
    Status: ExportTicketStatus.Pending,
    CreatedAt: new Date("2026-09-21T04:00:00.000Z"),
    UpdatedAt: new Date("2026-09-21T04:00:00.000Z"),
    DeletedAt: new Date(0),
  },
  {
    Uuid: "6584b574-4630-48dd-b043-d7b84c9d1103",
    HospitalUuid: "f02f7063-adc4-47ae-9a42-02ca5adff369",
    AccountUuid: "ec52c5f3-411d-472e-8df4-d5d17e5a540e",
    Note: "Phiếu xuất đã hủy.",
    Status: ExportTicketStatus.Cancelled,
    CreatedAt: new Date("2026-08-22T02:00:00.000Z"),
    UpdatedAt: new Date("2026-08-22T03:00:00.000Z"),
    DeletedAt: new Date(0),
  },
];
