import type { ImportTicketDetail } from "@/types/models";

export const mockImportTicketDetails: ImportTicketDetail[] = [
  {
    Uuid: "73a1386a-1ee7-46aa-a0b4-7780f5e51101",
    ImportTicketUuid: "bc4fcc5d-5421-4ae6-81ca-e6bc4c791101",
    MedicineUuid: "a951d152-7aea-4be8-b525-c38142331101",
    Quantity: 500,
    Price: 900,
  },
  {
    Uuid: "73a1386a-1ee7-46aa-a0b4-7780f5e51102",
    ImportTicketUuid: "bc4fcc5d-5421-4ae6-81ca-e6bc4c791101",
    MedicineUuid: "a951d152-7aea-4be8-b525-c38142331102",
    Quantity: 200,
    Price: 1400,
  },
  {
    Uuid: "73a1386a-1ee7-46aa-a0b4-7780f5e51103",
    ImportTicketUuid: "bc4fcc5d-5421-4ae6-81ca-e6bc4c791102",
    MedicineUuid: "a951d152-7aea-4be8-b525-c38142331103",
    Quantity: 100,
    Price: 36000,
  },
];
