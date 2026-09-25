import type { MedicineInventory } from "@/types/models";

const createdAt = new Date("2026-08-01T00:00:00.000Z");
const updatedAt = new Date("2026-09-20T00:00:00.000Z");

export const mockMedicineInventories: MedicineInventory[] = [
  {
    Uuid: "3f53fa33-66dd-42e8-a88c-68a724b81101",
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    MedicineUuid: "a951d152-7aea-4be8-b525-c38142331101",
    Quantity: 1200,
    MinimumQuantity: 200,
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
  {
    Uuid: "3f53fa33-66dd-42e8-a88c-68a724b81102",
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    MedicineUuid: "a951d152-7aea-4be8-b525-c38142331102",
    Quantity: 85,
    MinimumQuantity: 100,
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
  {
    Uuid: "3f53fa33-66dd-42e8-a88c-68a724b81103",
    HospitalUuid: "f02f7063-adc4-47ae-9a42-02ca5adff369",
    MedicineUuid: "a951d152-7aea-4be8-b525-c38142331103",
    Quantity: 240,
    MinimumQuantity: 50,
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
];
