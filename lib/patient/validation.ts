import { Gender } from "@/types/models";
import { getVietnamToday } from "@/lib/booking/working-hours";
import type {
  PatientProfileField,
  UpdatePatientProfileRequest,
} from "@/types/patient";

export type PatientProfileFieldErrors = Partial<
  Record<PatientProfileField, string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validatePatientProfile(
  values: UpdatePatientProfileRequest,
): PatientProfileFieldErrors {
  const errors: PatientProfileFieldErrors = {};

  if (values.Name.trim().length < 2) {
    errors.Name = "Nhập họ tên có ít nhất 2 ký tự.";
  } else if (values.Name.trim().length > 100) {
    errors.Name = "Họ tên tối đa 100 ký tự.";
  }

  if (!Object.values(Gender).includes(values.Gender)) {
    errors.Gender = "Chọn giới tính hợp lệ.";
  }

  const birthdate = new Date(values.Birthdate);
  if (
    Number.isNaN(birthdate.getTime()) ||
    birthdate.toISOString().slice(0, 10) >= getVietnamToday()
  ) {
    errors.Birthdate = "Ngày sinh phải trước ngày hiện tại.";
  }

  if (!emailPattern.test(values.Email.trim())) {
    errors.Email = "Nhập địa chỉ email hợp lệ.";
  }

  const avatar = values.Avatar.trim();
  if (avatar.length > 500) {
    errors.Avatar = "URL ảnh đại diện tối đa 500 ký tự.";
  } else if (avatar) {
    try {
      const url = new URL(avatar);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.Avatar = "URL ảnh phải bắt đầu bằng http:// hoặc https://.";
      }
    } catch {
      errors.Avatar = "Nhập URL ảnh đại diện hợp lệ.";
    }
  }

  return errors;
}
