import type AxiosMockAdapter from "axios-mock-adapter";

import { mockAccounts } from "@/data/mocks/accounts";
import { mockDoctorAppointments } from "@/data/mocks/doctor-appointments";
import { mockDoctors } from "@/data/mocks/doctors";
import { mockHospitalAppointments } from "@/data/mocks/hospital-appointments";
import { mockHospitals } from "@/data/mocks/hospitals";
import { mockMedicalServiceAppointments } from "@/data/mocks/medical-service-appointments";
import { mockMedicalServices } from "@/data/mocks/medical-services";
import { mockPatientProfiles } from "@/data/mocks/patient-profiles";
import { mockReviewDoctors } from "@/data/mocks/review-doctors";
import { mockReviewHospitals } from "@/data/mocks/review-hospitals";
import { mockReviewMedicalServices } from "@/data/mocks/review-medical-services";
import { getStringParam } from "@/lib/mocks/query-utils";
import {
  AppointmentStatus,
  BaseStatus,
  Role,
  type ReviewHospital,
} from "@/types/models";
import type {
  PatientReview,
  ReviewEligibilityTarget,
  ReviewTargetType,
  SaveReviewRequest,
} from "@/types/reviews";

const reviewStorageKey = "an-tam-y-te.mock-reviews.v1";
let restoredPersistedReviews = false;

export function registerReviewRoutes(mock: AxiosMockAdapter) {
  mock.onGet("/reviews/eligibility").reply((config): [number, unknown] => {
    restoreReviewState();
    const current = getCurrentPatient(config.headers);
    if (!current) return unauthorizedResponse();
    const appointmentUuid = getStringParam(config.params, "appointmentUuid");
    const targets = getAppointmentTargets(
      appointmentUuid,
      current.accountUuid,
      current.patientUuid,
    );
    if (!targets) {
      return [
        403,
        {
          Message:
            "Chỉ có thể đánh giá sau khi lịch khám của bạn đã hoàn thành.",
        },
      ];
    }
    return [
      200,
      {
        Data: { AppointmentUuid: appointmentUuid, Targets: targets },
        Message: "Lấy đối tượng có thể đánh giá thành công.",
      },
    ];
  });

  mock.onGet("/reviews/public").reply((config): [number, unknown] => {
    restoreReviewState();
    const type = getStringParam(config.params, "type");
    const targetUuid = getStringParam(config.params, "targetUuid");
    if (!isReviewType(type) || !targetUuid) {
      return [422, { Message: "Đối tượng đánh giá không hợp lệ." }];
    }
    return [
      200,
      {
        Data: getReviewStore(type)
          .filter(
            (item) =>
              getReviewTargetUuid(type, item) === targetUuid &&
              item.Status === BaseStatus.Active,
          )
          .sort((left, right) => right.CreatedAt.getTime() - left.CreatedAt.getTime())
          .map(({ Uuid, Content, NumberOfStar, CreatedAt }) => ({
            Uuid,
            Content,
            NumberOfStar,
            CreatedAt,
          })),
        Message: "Lấy đánh giá công khai thành công.",
      },
    ];
  });

  mock
    .onPut(/^\/reviews\/(hospital|doctor|medical-service)\/[^/]+$/)
    .reply((config): [number, unknown] => {
      restoreReviewState();
      const current = getCurrentPatient(config.headers);
      if (!current) return unauthorizedResponse();
      const segments = config.url?.split("/") ?? [];
      const type = segments.at(-2) ?? "";
      const targetUuid = decodeURIComponent(segments.at(-1) ?? "");
      if (!isReviewType(type) || !targetUuid) {
        return [422, { Message: "Đối tượng đánh giá không hợp lệ." }];
      }
      const request = parseBody(config.data);
      const errors = validateReviewRequest(request);
      if (errors) {
        return [422, { Message: "Vui lòng kiểm tra lại đánh giá.", Errors: errors }];
      }
      const payload = request as SaveReviewRequest;
      if (!hasDoneAppointment(type, targetUuid, current.accountUuid)) {
        return [
          403,
          {
            Message:
              "Bạn cần hoàn thành lịch khám liên quan trước khi đánh giá.",
          },
        ];
      }
      if (!targetExists(type, targetUuid)) {
        return [404, { Message: "Không tìm thấy đối tượng đánh giá." }];
      }

      const store = getReviewStore(type);
      const existing = store.find(
        (item) =>
          item.PatientUuid === current.patientUuid &&
          getReviewTargetUuid(type, item) === targetUuid,
      );
      if (existing) {
        existing.Content = payload.Content.trim();
        existing.NumberOfStar = payload.NumberOfStar;
        existing.Status = BaseStatus.Active;
        existing.IsViewed = false;
        persistReviewState();
        return [
          200,
          { Data: existing, Message: "Cập nhật đánh giá thành công." },
        ];
      }

      const common = {
        Uuid: crypto.randomUUID(),
        Content: payload.Content.trim(),
        NumberOfStar: payload.NumberOfStar,
        PatientUuid: current.patientUuid,
        Status: BaseStatus.Active,
        IsViewed: false,
        CreatedAt: new Date(),
      };
      const review = createReview(type, targetUuid, common);
      pushReview(type, review);
      persistReviewState();
      return [
        201,
        { Data: review, Message: "Gửi đánh giá thành công." },
      ];
    });
}

function getAppointmentTargets(
  appointmentUuid: string,
  accountUuid: string,
  patientUuid: string,
): ReviewEligibilityTarget[] | null {
  const hospitalAppointment = mockHospitalAppointments.find(
    (item) =>
      item.Uuid === appointmentUuid &&
      item.AccountUuid === accountUuid &&
      item.Status === AppointmentStatus.Done,
  );
  if (hospitalAppointment) {
    const hospital = mockHospitals.find(
      (item) => item.Uuid === hospitalAppointment.HospitalUuid,
    );
    return hospital
      ? [buildTarget("hospital", hospital.Uuid, hospital.Name, patientUuid)]
      : null;
  }

  const doctorAppointment = mockDoctorAppointments.find(
    (item) =>
      item.Uuid === appointmentUuid &&
      item.AccountUuid === accountUuid &&
      item.Status === AppointmentStatus.Done,
  );
  if (doctorAppointment) {
    const hospital = mockHospitals.find(
      (item) => item.Uuid === doctorAppointment.HospitalUuid,
    );
    const doctor = mockDoctors.find(
      (item) => item.Uuid === doctorAppointment.DoctorUuid,
    );
    return hospital && doctor
      ? [
          buildTarget("hospital", hospital.Uuid, hospital.Name, patientUuid),
          buildTarget("doctor", doctor.Uuid, doctor.Name, patientUuid),
        ]
      : null;
  }

  const serviceAppointment = mockMedicalServiceAppointments.find(
    (item) =>
      item.Uuid === appointmentUuid &&
      item.AccountUuid === accountUuid &&
      item.Status === AppointmentStatus.Done,
  );
  if (serviceAppointment) {
    const hospital = mockHospitals.find(
      (item) => item.Uuid === serviceAppointment.HospitalUuid,
    );
    const service = mockMedicalServices.find(
      (item) => item.Uuid === serviceAppointment.MedicalServiceUuid,
    );
    return hospital && service
      ? [
          buildTarget("hospital", hospital.Uuid, hospital.Name, patientUuid),
          buildTarget(
            "medical-service",
            service.Uuid,
            service.Name,
            patientUuid,
          ),
        ]
      : null;
  }
  return null;
}

function buildTarget(
  type: ReviewTargetType,
  targetUuid: string,
  targetName: string,
  patientUuid: string,
): ReviewEligibilityTarget {
  const review = getReviewStore(type).find(
    (item) =>
      item.PatientUuid === patientUuid &&
      getReviewTargetUuid(type, item) === targetUuid,
  );
  return {
    Type: type,
    TargetUuid: targetUuid,
    TargetName: targetName,
    Review: review ?? null,
  };
}

function hasDoneAppointment(
  type: ReviewTargetType,
  targetUuid: string,
  accountUuid: string,
) {
  if (type === "hospital") {
    return [
      ...mockHospitalAppointments,
      ...mockDoctorAppointments,
      ...mockMedicalServiceAppointments,
    ].some(
      (item) =>
        item.AccountUuid === accountUuid &&
        item.HospitalUuid === targetUuid &&
        item.Status === AppointmentStatus.Done,
    );
  }
  if (type === "doctor") {
    return mockDoctorAppointments.some(
      (item) =>
        item.AccountUuid === accountUuid &&
        item.DoctorUuid === targetUuid &&
        item.Status === AppointmentStatus.Done,
    );
  }
  return mockMedicalServiceAppointments.some(
    (item) =>
      item.AccountUuid === accountUuid &&
      item.MedicalServiceUuid === targetUuid &&
      item.Status === AppointmentStatus.Done,
  );
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
  return account && profile
    ? { accountUuid: account.Uuid, patientUuid: profile.Uuid }
    : null;
}

function getReviewStore(type: ReviewTargetType): PatientReview[] {
  if (type === "hospital") return mockReviewHospitals;
  if (type === "doctor") return mockReviewDoctors;
  return mockReviewMedicalServices;
}

function getReviewTargetUuid(type: ReviewTargetType, review: PatientReview) {
  if (type === "hospital" && "HospitalUuid" in review) {
    return review.HospitalUuid;
  }
  if (type === "doctor" && "DoctorUuid" in review) {
    return review.DoctorUuid;
  }
  if (type === "medical-service" && "MedicalServiceUuid" in review) {
    return review.MedicalServiceUuid;
  }
  return "";
}

function targetExists(type: ReviewTargetType, targetUuid: string) {
  if (type === "hospital") {
    return mockHospitals.some((item) => item.Uuid === targetUuid);
  }
  if (type === "doctor") {
    return mockDoctors.some((item) => item.Uuid === targetUuid);
  }
  return mockMedicalServices.some((item) => item.Uuid === targetUuid);
}

function createReview(
  type: ReviewTargetType,
  targetUuid: string,
  common: Omit<ReviewHospital, "HospitalUuid">,
): PatientReview {
  if (type === "hospital") return { ...common, HospitalUuid: targetUuid };
  if (type === "doctor") return { ...common, DoctorUuid: targetUuid };
  return { ...common, MedicalServiceUuid: targetUuid };
}

function pushReview(type: ReviewTargetType, review: PatientReview) {
  if (type === "hospital" && "HospitalUuid" in review) {
    mockReviewHospitals.push(review);
  } else if (type === "doctor" && "DoctorUuid" in review) {
    mockReviewDoctors.push(review);
  } else if (type === "medical-service" && "MedicalServiceUuid" in review) {
    mockReviewMedicalServices.push(review);
  }
}

function restoreReviewState() {
  if (typeof window === "undefined" || restoredPersistedReviews) return;
  restoredPersistedReviews = true;
  try {
    const persisted = JSON.parse(localStorage.getItem(reviewStorageKey) ?? "{}") as Record<
      string,
      unknown
    >;
    for (const type of [
      "hospital",
      "doctor",
      "medical-service",
    ] satisfies ReviewTargetType[]) {
      const values = persisted[type];
      if (!Array.isArray(values)) continue;
      for (const value of values) {
        const review = hydratePersistedReview(type, value);
        if (!review) continue;
        const store = getReviewStore(type);
        if (
          !targetExists(type, getReviewTargetUuid(type, review)) ||
          !hasDoneAppointmentForPatient(type, review)
        ) {
          continue;
        }
        const existing = store.find(
          (item) =>
            item.PatientUuid === review.PatientUuid &&
            getReviewTargetUuid(type, item) === getReviewTargetUuid(type, review),
        );
        if (store.some((item) => item.Uuid === review.Uuid && item !== existing)) {
          continue;
        }
        if (existing) {
          existing.Content = review.Content;
          existing.NumberOfStar = review.NumberOfStar;
          existing.Status = BaseStatus.Active;
          existing.IsViewed = false;
        } else {
          review.Status = BaseStatus.Active;
          review.IsViewed = false;
          pushReview(type, review);
        }
      }
    }
  } catch {
    localStorage.removeItem(reviewStorageKey);
  }
}

function persistReviewState() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      reviewStorageKey,
      JSON.stringify({
        hospital: mockReviewHospitals,
        doctor: mockReviewDoctors,
        "medical-service": mockReviewMedicalServices,
      }),
    );
  } catch {
    // The in-memory mock remains usable when storage is unavailable or full.
  }
}

function hydratePersistedReview(
  type: ReviewTargetType,
  value: unknown,
): PatientReview | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const review = value as Record<string, unknown>;
  const targetField =
    type === "hospital"
      ? "HospitalUuid"
      : type === "doctor"
        ? "DoctorUuid"
        : "MedicalServiceUuid";
  const createdAt = new Date(String(review.CreatedAt));
  if (
    typeof review.Uuid !== "string" ||
    typeof review.PatientUuid !== "string" ||
    typeof review[targetField] !== "string" ||
    typeof review.Content !== "string" ||
    review.Content.trim().length < 10 ||
    review.Content.trim().length > 1000 ||
    !Number.isInteger(review.NumberOfStar) ||
    Number(review.NumberOfStar) < 1 ||
    Number(review.NumberOfStar) > 5 ||
    (review.Status !== BaseStatus.Active && review.Status !== BaseStatus.InActive) ||
    typeof review.IsViewed !== "boolean" ||
    Number.isNaN(createdAt.getTime())
  ) {
    return null;
  }
  return { ...review, CreatedAt: createdAt } as PatientReview;
}

function hasDoneAppointmentForPatient(
  type: ReviewTargetType,
  review: PatientReview,
) {
  const profile = mockPatientProfiles.find(
    (item) => item.Uuid === review.PatientUuid,
  );
  const account = mockAccounts.find(
    (item) =>
      item.Uuid === profile?.AccountUuid &&
      item.Role === Role.PATIENT &&
      item.Status === BaseStatus.Active,
  );
  return Boolean(
    account &&
      hasDoneAppointment(
        type,
        getReviewTargetUuid(type, review),
        account.Uuid,
      ),
  );
}

function validateReviewRequest(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { Content: "Nội dung đánh giá không hợp lệ." };
  }
  const body = value as Record<string, unknown>;
  const errors: Partial<Record<keyof SaveReviewRequest, string>> = {};
  if (
    !Number.isInteger(body.NumberOfStar) ||
    Number(body.NumberOfStar) < 1 ||
    Number(body.NumberOfStar) > 5
  ) {
    errors.NumberOfStar = "Chọn số sao từ 1 đến 5.";
  }
  if (typeof body.Content !== "string" || body.Content.trim().length < 10) {
    errors.Content = "Nội dung đánh giá cần ít nhất 10 ký tự.";
  } else if (body.Content.trim().length > 1000) {
    errors.Content = "Nội dung đánh giá tối đa 1000 ký tự.";
  }
  return Object.keys(errors).length ? errors : null;
}

function parseBody(data: unknown): unknown {
  try {
    return typeof data === "string" ? (JSON.parse(data) as unknown) : data;
  } catch {
    return null;
  }
}

function isReviewType(value: string): value is ReviewTargetType {
  return value === "hospital" || value === "doctor" || value === "medical-service";
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

function unauthorizedResponse(): [number, unknown] {
  return [403, { Message: "Phiên đăng nhập không hợp lệ." }];
}
