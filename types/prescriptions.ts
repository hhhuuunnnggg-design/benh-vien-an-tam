import type { PaginatedData } from "@/lib/http/response";
import type {
  DoctorProfile,
  Hospital,
  Medicine,
  Prescription,
  PrescriptionDetail,
  PrescriptionStatus,
} from "@/types/models";

export type PrescriptionAppointmentType =
  | "hospital"
  | "doctor"
  | "medical-service";

export type LinkedPrescriptionAppointment = {
  Uuid: string;
  Type: PrescriptionAppointmentType;
};

export type PrescriptionSummary = {
  Prescription: Prescription;
  Hospital: Pick<Hospital, "Uuid" | "Name" | "Slug">;
  Doctor: Pick<DoctorProfile, "Uuid" | "Name" | "Slug">;
  Appointment: LinkedPrescriptionAppointment | null;
  TotalAmount: number | null;
  NumberOfItems: number;
};

export type PrescriptionMedicineDetail = {
  Detail: PrescriptionDetail;
  Medicine: Medicine;
};

export type PrescriptionView = PrescriptionSummary & {
  Details: PrescriptionMedicineDetail[];
};

export type PrescriptionListQuery = {
  status?: PrescriptionStatus;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};

export type PrescriptionList = PaginatedData<PrescriptionSummary>;

export type PrescriptionErrorResponse = {
  Message?: string;
};
