export type Guid = string;

export enum Role {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  HOSPITAL_ADMIN = "HOSPITAL_ADMIN",
  DOCTOR = "DOCTOR",
  STAFF = "STAFF",
  WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER",
  PATIENT = "PATIENT",
}

export enum BaseStatus {
  Active = "Active",
  InActive = "InActive",
}

export enum Gender {
  Other = "Other",
  Male = "Male",
  Female = "Female",
}

export type Account = {
  Uuid: Guid;
  Phone: string;
  Password: string;
  Role: Role;
  Status: BaseStatus;
  HospitalUuid: Guid | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type PatientProfile = {
  Uuid: Guid;
  Avatar: string;
  Name: string;
  Gender: Gender;
  Birthdate: Date;
  MedicalCode: string;
  Email: string;
  AccountUuid: Guid;
};

export type Hospital = {
  Uuid: Guid;
  Image: string;
  MapUrl: string;
  Slug: string;
  Name: string;
  Address: string;
  NumberOfRoom: number;
  Description: string;
  DetailService: string;
  WorkingHour: string;
  Status: BaseStatus;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export enum RoomStatus {
  Available = "Available",
  Occupied = "Occupied",
  Maintenance = "Maintenance",
}

export type Room = {
  Uuid: Guid;
  Name: string;
  Status: RoomStatus;
  HospitalUuid: Guid;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type DoctorProfile = {
  Uuid: Guid;
  Image: string;
  Slug: string;
  Name: string;
  Price: number;
  DepartmentDisplay: string;
  Introduction: string;
  Expertise: string;
  Specialty: string;
  Workplace: string;
  AccountUuid: Guid;
  HospitalUuid: Guid;
};

export type DoctorDepartment = {
  Uuid: Guid;
  DoctorUuid: Guid;
  DepartmentUuid: Guid;
};

export type Department = {
  Uuid: Guid;
  Icon: string;
  Slug: string;
  Name: string;
  Description: string;
  Status: BaseStatus;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type HospitalDepartment = {
  Uuid: Guid;
  HospitalUuid: Guid;
  DepartmentUuid: Guid;
};

export type MedicalService = {
  Uuid: Guid;
  Image: string;
  Slug: string;
  Name: string;
  Price: number;
  Description: string;
  DetailService: string;
  WorkingHour: string;
  Status: BaseStatus;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type HospitalMedicalService = {
  Uuid: Guid;
  HospitalUuid: Guid;
  MedicalServiceUuid: Guid;
};

export type ReviewHospital = {
  Uuid: Guid;
  Content: string;
  NumberOfStar: number;
  PatientUuid: Guid;
  HospitalUuid: Guid;
  Status: BaseStatus;
  IsViewed: boolean;
  CreatedAt: Date;
};

export type ReviewDoctor = {
  Uuid: Guid;
  Content: string;
  NumberOfStar: number;
  PatientUuid: Guid;
  DoctorUuid: Guid;
  Status: BaseStatus;
  IsViewed: boolean;
  CreatedAt: Date;
};

export type ReviewMedicalService = {
  Uuid: Guid;
  Content: string;
  NumberOfStar: number;
  PatientUuid: Guid;
  MedicalServiceUuid: Guid;
  Status: BaseStatus;
  IsViewed: boolean;
  CreatedAt: Date;
};

export enum MedicineStatus {
  Active = "Active",
  InActive = "InActive",
}

export enum MedicineUnit {
  Other = "Other",
  Tablet = "Tablet",
  Bottle = "Bottle",
  Box = "Box",
  Tube = "Tube",
  Sachet = "Sachet",
}

export type Medicine = {
  Uuid: Guid;
  Image: string;
  Name: string;
  Description: string;
  Price: number;
  Unit: MedicineUnit;
  Status: MedicineStatus;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export enum PrescriptionStatus {
  Unpaid = "Unpaid",
  Paid = "Paid",
  Cancelled = "Cancelled",
}

export type Prescription = {
  Uuid: Guid;
  PatientProfileUuid: Guid;
  DoctorProfileUuid: Guid;
  HospitalUuid: Guid;
  Status: PrescriptionStatus;
  Note: string;
  HospitalAppointmentUuid: Guid | null;
  MedicalServiceAppointmentUuid: Guid | null;
  DoctorAppointmentUuid: Guid | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type PrescriptionDetail = {
  Uuid: Guid;
  PrescriptionUuid: Guid;
  MedicineUuid: Guid;
  Quantity: number;
  QuantityPerDose: number;
  DosesPerDay: number;
  Duration: number;
  Price: number;
  IsExternal: boolean;
  Note: string;
};

export enum AppointmentStatus {
  Pending = "Pending",
  Approved = "Approved",
  Done = "Done",
  Cancelled = "Cancelled",
}

export type HospitalAppointment = {
  Uuid: Guid;
  PatientName: string;
  Gender: string;
  Note: string;
  MedicalCode: string;
  AppointmentAt: Date;
  Status: AppointmentStatus;
  HospitalUuid: Guid;
  AccountUuid: Guid;
  RoomUuid: Guid;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type MedicalServiceAppointment = {
  Uuid: Guid;
  PatientName: string;
  Gender: string;
  Note: string;
  MedicalCode: string;
  AppointmentAt: Date;
  Status: AppointmentStatus;
  MedicalServiceUuid: Guid;
  AccountUuid: Guid;
  HospitalUuid: Guid;
  RoomUuid: Guid;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type DoctorAppointment = {
  Uuid: Guid;
  PatientName: string;
  Gender: string;
  Note: string;
  MedicalCode: string;
  AppointmentAt: Date;
  Status: AppointmentStatus;
  DoctorUuid: Guid;
  AccountUuid: Guid;
  HospitalUuid: Guid;
  RoomUuid: Guid;
  CreatedAt: Date;
  UpdatedAt: Date;
};
