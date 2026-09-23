import { RoomStatus, type Room } from "@/types/models";

const createdAt = new Date("2025-01-01T00:00:00.000Z");
const updatedAt = new Date("2026-08-01T00:00:00.000Z");

export const mockRooms: Room[] = [
  {
    Uuid: "b19c4dad-f093-43b1-bc09-eebd8bb44101",
    Name: "Phòng khám A1",
    Status: RoomStatus.Available,
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
  {
    Uuid: "b19c4dad-f093-43b1-bc09-eebd8bb44102",
    Name: "Phòng khám B1",
    Status: RoomStatus.Available,
    HospitalUuid: "f02f7063-adc4-47ae-9a42-02ca5adff369",
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
  {
    Uuid: "b19c4dad-f093-43b1-bc09-eebd8bb44103",
    Name: "Phòng khám C1",
    Status: RoomStatus.Available,
    HospitalUuid: "3ab3cdb8-606a-4718-9ed7-a8d7a781d4f7",
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
  {
    Uuid: "b19c4dad-f093-43b1-bc09-eebd8bb44104",
    Name: "Phòng khám D1",
    Status: RoomStatus.Available,
    HospitalUuid: "c750f76e-a4cd-46ec-bb08-1c58ab73c901",
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
  {
    Uuid: "b19c4dad-f093-43b1-bc09-eebd8bb44105",
    Name: "Phòng khám E1",
    Status: RoomStatus.Available,
    HospitalUuid: "2d76b699-c01b-41a2-8ccc-a39261eb8d02",
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    DeletedAt: new Date(0),
  },
];
