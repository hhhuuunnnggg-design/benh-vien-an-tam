import {
  MedicineStatus,
  MedicineUnit,
  type Medicine,
} from "@/types/models";

const createdAt = new Date("2025-01-10T00:00:00.000Z");
const updatedAt = new Date("2026-08-20T00:00:00.000Z");

export const mockMedicines: Medicine[] = [
  {
    Uuid: "a951d152-7aea-4be8-b525-c38142331101",
    Image: "",
    Name: "Paracetamol 500mg",
    Description: "Thuốc giảm đau và hạ sốt.",
    Price: 1200,
    Unit: MedicineUnit.Tablet,
    Status: MedicineStatus.Active,
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
  {
    Uuid: "a951d152-7aea-4be8-b525-c38142331102",
    Image: "",
    Name: "Vitamin C 500mg",
    Description: "Bổ sung vitamin C theo chỉ định.",
    Price: 1800,
    Unit: MedicineUnit.Tablet,
    Status: MedicineStatus.Active,
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
  {
    Uuid: "a951d152-7aea-4be8-b525-c38142331103",
    Image: "",
    Name: "Dung dịch súc họng 250ml",
    Description: "Sử dụng ngoài theo hướng dẫn của bác sĩ.",
    Price: 45000,
    Unit: MedicineUnit.Bottle,
    Status: MedicineStatus.Active,
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
];
