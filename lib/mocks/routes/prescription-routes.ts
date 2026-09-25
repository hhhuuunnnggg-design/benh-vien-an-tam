import type AxiosMockAdapter from "axios-mock-adapter";

import { mockAccounts } from "@/data/mocks/accounts";
import { mockAppointments } from "@/data/mocks/appointments";
import { mockDoctors } from "@/data/mocks/doctors";
import { mockHospitals } from "@/data/mocks/hospitals";
import { mockMedicines } from "@/data/mocks/medicines";
import { mockPatientProfiles } from "@/data/mocks/patient-profiles";
import { mockPrescriptionDetails } from "@/data/mocks/prescription-details";
import { mockPrescriptions } from "@/data/mocks/prescriptions";
import {
  getVietnamDateTimeParts,
  isValidDateString,
} from "@/lib/booking/working-hours";
import { getStringParam } from "@/lib/mocks/query-utils";
import {
  AppointmentType,
  BaseStatus,
  PrescriptionStatus,
  Role,
  type Prescription,
} from "@/types/models";
import type {
  LinkedPrescriptionAppointment,
  PrescriptionSummary,
  PrescriptionView,
} from "@/types/prescriptions";

export function registerPrescriptionRoutes(mock: AxiosMockAdapter) {
  mock.onGet("/prescriptions").reply((config): [number, unknown] => {
    const patient = getCurrentPatient(config.headers);
    if (!patient) return unauthorizedResponse();

    const status = getStringParam(config.params, "status");
    const from = getStringParam(config.params, "from");
    const to = getStringParam(config.params, "to");
    if (
      (status &&
        !Object.values(PrescriptionStatus).includes(status as PrescriptionStatus)) ||
      (from && !isValidDateString(from)) ||
      (to && !isValidDateString(to)) ||
      (from && to && from > to)
    ) {
      return [422, { Message: "Bộ lọc đơn thuốc không hợp lệ." }];
    }

    const page = parsePositiveInteger(config.params?.page, 1);
    const pageSize = Math.min(parsePositiveInteger(config.params?.pageSize, 5), 20);
    const items = mockPrescriptions
      .filter(
        (item) =>
          item.PatientProfileUuid === patient.profileUuid &&
          item.DeletedAt.getTime() === 0,
      )
      .filter((item) => !status || item.Status === status)
      .filter((item) => {
        const date = getVietnamDateTimeParts(item.CreatedAt).Date;
        return (!from || date >= from) && (!to || date <= to);
      })
      .sort((left, right) => right.CreatedAt.getTime() - left.CreatedAt.getTime())
      .map(buildSummary)
      .filter((item): item is PrescriptionSummary => Boolean(item));
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;

    return [
      200,
      {
        Data: {
          Items: items.slice(start, start + pageSize),
          Page: safePage,
          PageSize: pageSize,
          TotalItems: items.length,
          TotalPages: totalPages,
        },
        Message: "Lấy danh sách đơn thuốc thành công.",
      },
    ];
  });

  mock.onGet(/^\/prescriptions\/[^/]+$/).reply((config): [number, unknown] => {
    const patient = getCurrentPatient(config.headers);
    if (!patient) return unauthorizedResponse();
    const uuid = decodeURIComponent(config.url?.split("/").pop() ?? "");
    const prescription = mockPrescriptions.find(
      (item) =>
        item.Uuid === uuid &&
        item.PatientProfileUuid === patient.profileUuid &&
        item.DeletedAt.getTime() === 0,
    );
    if (!prescription) return notFoundResponse();
    const view = buildView(prescription);
    return view
      ? [200, { Data: view, Message: "Lấy chi tiết đơn thuốc thành công." }]
      : notFoundResponse();
  });
}

function buildSummary(prescription: Prescription): PrescriptionSummary | null {
  const hospital = mockHospitals.find(
    (item) => item.Uuid === prescription.HospitalUuid,
  );
  const doctor = mockDoctors.find(
    (item) => item.Uuid === prescription.DoctorProfileUuid,
  );
  if (!hospital || !doctor) return null;
  const details = mockPrescriptionDetails.filter(
    (item) => item.PrescriptionUuid === prescription.Uuid,
  );
  return {
    Prescription: prescription,
    Hospital: {
      Uuid: hospital.Uuid,
      Name: hospital.Name,
      Slug: hospital.Slug,
    },
    Doctor: { Uuid: doctor.Uuid, Name: doctor.Name, Slug: doctor.Slug },
    Appointment: getLinkedAppointment(prescription),
    TotalAmount: details.length
      ? details.reduce((total, item) => total + item.Quantity * item.Price, 0)
      : null,
    NumberOfItems: details.length,
  };
}

function buildView(prescription: Prescription): PrescriptionView | null {
  const summary = buildSummary(prescription);
  if (!summary) return null;
  return {
    ...summary,
    Details: mockPrescriptionDetails
      .filter((item) => item.PrescriptionUuid === prescription.Uuid)
      .map((detail) => {
        const medicine = mockMedicines.find(
          (item) => item.Uuid === detail.MedicineUuid,
        );
        return medicine ? { Detail: detail, Medicine: medicine } : null;
      })
      .filter((item): item is PrescriptionView["Details"][number] => Boolean(item)),
  };
}

function getLinkedAppointment(
  prescription: Prescription,
): LinkedPrescriptionAppointment | null {
  if (!prescription.AppointmentUuid) return null;
  const appointment = mockAppointments.find(
    (item) =>
      item.Uuid === prescription.AppointmentUuid &&
      item.PatientUuid === prescription.PatientProfileUuid &&
      item.HospitalUuid === prescription.HospitalUuid &&
      (item.Type !== AppointmentType.Doctor ||
        item.DoctorUuid === prescription.DoctorProfileUuid) &&
      item.DeletedAt.getTime() === 0,
  );
  if (!appointment) return null;
  const type =
    appointment.Type === AppointmentType.Doctor
      ? "doctor"
      : appointment.Type === AppointmentType.Service
        ? "medical-service"
        : "hospital";
  return { Uuid: appointment.Uuid, Type: type };
}

function getCurrentPatient(headers: unknown) {
  const accountUuid = getHeader(headers, "X-Mock-Account-Uuid");
  const account = mockAccounts.find(
    (item) =>
      item.Uuid === accountUuid &&
      item.Role === Role.PATIENT &&
      item.Status === BaseStatus.Active,
  );
  const profile = mockPatientProfiles.find(
    (item) => item.AccountUuid === account?.Uuid,
  );
  return account && profile ? { profileUuid: profile.Uuid } : null;
}

function getHeader(headers: unknown, name: string) {
  if (!headers || typeof headers !== "object") return "";
  const get = (headers as { get?: (key: string) => unknown }).get;
  const value =
    typeof get === "function"
      ? get.call(headers, name)
      : (headers as Record<string, unknown>)[name];
  return typeof value === "string" ? value : "";
}

function parsePositiveInteger(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function unauthorizedResponse(): [number, unknown] {
  return [403, { Message: "Phiên đăng nhập không hợp lệ." }];
}

function notFoundResponse(): [number, unknown] {
  return [404, { Message: "Không tìm thấy đơn thuốc." }];
}
