import { AppointmentStatus, type DoctorAppointment } from "@/types/models";

export const mockDoctorAppointments: DoctorAppointment[] = [
  {
    Uuid: "7c37f250-817a-49b6-9f91-ce295c295201",
    PatientName: "Nguyễn An",
    Gender: "Male",
    Note: "Lịch mẫu dùng để kiểm tra xung đột.",
    MedicalCode: "BN10001234",
    AppointmentAt: new Date("2026-09-23T10:00:00+07:00"),
    Status: AppointmentStatus.Pending,
    DoctorUuid: "57479ec8-29e0-44af-a8b0-15041655c5b8",
    AccountUuid: "dfbd3aa5-ab7a-4ad7-a0a1-e870f38129b8",
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    RoomUuid: "b19c4dad-f093-43b1-bc09-eebd8bb44101",
    CreatedAt: new Date("2026-09-20T03:00:00.000Z"),
    UpdatedAt: new Date("2026-09-20T03:00:00.000Z"),
  },
  {
    Uuid: "7c37f250-817a-49b6-9f91-ce295c295202",
    PatientName: "Nguyễn An",
    Gender: "Male",
    Note: "Đã hoàn thành khám.",
    MedicalCode: "BN10001234",
    AppointmentAt: new Date("2026-09-18T10:00:00+07:00"),
    Status: AppointmentStatus.Done,
    DoctorUuid: "57479ec8-29e0-44af-a8b0-15041655c5b8",
    AccountUuid: "dfbd3aa5-ab7a-4ad7-a0a1-e870f38129b8",
    HospitalUuid: "a4a0a61f-577d-48cb-94b9-c9ce85554b11",
    RoomUuid: "b19c4dad-f093-43b1-bc09-eebd8bb44101",
    CreatedAt: new Date("2026-09-12T03:00:00.000Z"),
    UpdatedAt: new Date("2026-09-18T04:00:00.000Z"),
  },
];
