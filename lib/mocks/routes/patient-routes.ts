import type AxiosMockAdapter from "axios-mock-adapter";

import { mockAccounts } from "@/data/mocks/accounts";
import { mockPatientProfiles } from "@/data/mocks/patient-profiles";
import { validatePatientProfile } from "@/lib/patient/validation";
import { BaseStatus, Gender, Role } from "@/types/models";
import type { UpdatePatientProfileRequest } from "@/types/patient";

const allowedUpdateFields = new Set([
  "Avatar",
  "Name",
  "Gender",
  "Birthdate",
  "Email",
]);

export function registerPatientRoutes(mock: AxiosMockAdapter) {
  mock.onGet("/patients/me").reply((config): [number, unknown] => {
    const current = getCurrentPatient(config.headers);
    return current
      ? [
          200,
          {
            Data: { Profile: current.profile, Phone: current.account.Phone },
            Message: "Lấy hồ sơ người bệnh thành công.",
          },
        ]
      : unauthorizedResponse();
  });

  mock.onPut("/patients/me").reply((config): [number, unknown] => {
    const current = getCurrentPatient(config.headers);
    if (!current) return unauthorizedResponse();

    const body = parseBody(config.data);
    if (!isUpdateRequest(body)) {
      return [422, { Message: "Dữ liệu cập nhật hồ sơ không hợp lệ." }];
    }
    const errors = validatePatientProfile(body);
    if (Object.keys(errors).length) {
      return [
        422,
        { Message: "Vui lòng kiểm tra lại thông tin.", Errors: errors },
      ];
    }

    current.profile.Avatar = body.Avatar.trim();
    current.profile.Name = body.Name.trim();
    current.profile.Gender = body.Gender;
    current.profile.Birthdate = new Date(body.Birthdate);
    current.profile.Email = body.Email.trim().toLowerCase();

    return [
      200,
      {
        Data: { Profile: current.profile, Phone: current.account.Phone },
        Message: "Cập nhật hồ sơ thành công.",
      },
    ];
  });
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
  return account && profile ? { account, profile } : null;
}

function isUpdateRequest(value: unknown): value is UpdatePatientProfileRequest {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const body = value as Record<string, unknown>;
  if (Object.keys(body).some((key) => !allowedUpdateFields.has(key))) return false;
  return (
    Object.keys(body).length === allowedUpdateFields.size &&
    typeof body.Avatar === "string" &&
    typeof body.Name === "string" &&
    Object.values(Gender).includes(body.Gender as Gender) &&
    (typeof body.Birthdate === "string" || body.Birthdate instanceof Date) &&
    typeof body.Email === "string"
  );
}

function parseBody(data: unknown): unknown {
  try {
    return typeof data === "string" ? (JSON.parse(data) as unknown) : data;
  } catch {
    return null;
  }
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
