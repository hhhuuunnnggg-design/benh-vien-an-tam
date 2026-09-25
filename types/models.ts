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
  LImage: string;
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
  IsInsured: boolean;
  InsuranceCap: number;
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
  Status: BaseStatus;
  IsInsured: boolean;
  InsuranceCap: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type MedicineInventory = {
  Uuid: Guid;
  HospitalUuid: Guid;
  MedicineUuid: Guid;
  Quantity: number;
  MinimumQuantity: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export enum ProviderStatus {
  Active = "Active",
  InActive = "InActive",
}

export type Provider = {
  Uuid: Guid;
  Name: string;
  Address: string;
  Hotline: string;
  Status: ProviderStatus;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export enum ImportTicketStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
}

export type ImportTicket = {
  Uuid: Guid;
  HospitalUuid: Guid;
  AccountUuid: Guid;
  ProviderUuid: Guid;
  Note: string;
  Status: ImportTicketStatus;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type ImportTicketDetail = {
  Uuid: Guid;
  ImportTicketUuid: Guid;
  MedicineUuid: Guid;
  Quantity: number;
  Price: number;
};

export enum ExportTicketStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
}

export type ExportTicket = {
  Uuid: Guid;
  HospitalUuid: Guid;
  AccountUuid: Guid;
  Note: string;
  Status: ExportTicketStatus;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type ExportTicketDetail = {
  Uuid: Guid;
  ExportTicketUuid: Guid;
  MedicineUuid: Guid;
  Quantity: number;
  Price: number;
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
  AppointmentUuid: Guid | null;
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

export enum AppointmentType {
  Doctor = "Doctor",
  Hospital = "Hospital",
  Service = "Service",
}

type AppointmentBase = {
  Uuid: Guid;
  PatientName: string;
  Gender: Gender;
  MedicalCode: string;
  Note: string;
  StartTime: Date;
  Status: AppointmentStatus;
  PatientUuid: Guid;
  HospitalUuid: Guid;
  RoomUuid: Guid | null;
  DoctorNote: string;
  TotalPrice: number;
  IsPaid: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
};

export type Appointment =
  | (AppointmentBase & {
      Type: AppointmentType.Hospital;
      DoctorUuid: null;
      MedicalServiceUuid: null;
    })
  | (AppointmentBase & {
      Type: AppointmentType.Doctor;
      DoctorUuid: Guid;
      MedicalServiceUuid: null;
    })
  | (AppointmentBase & {
      Type: AppointmentType.Service;
      DoctorUuid: null;
      MedicalServiceUuid: Guid;
    });

export type AppointmentMedicalService = {
  Uuid: Guid;
  AppointmentUuid: Guid;
  MedicalServiceUuid: Guid;
  Price: number;
};
