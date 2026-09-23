import type { PatientProfile } from "@/types/models";

export type PatientProfileView = {
  Profile: PatientProfile;
  Phone: string;
};

export type UpdatePatientProfileRequest = Pick<
  PatientProfile,
  "Avatar" | "Name" | "Gender" | "Birthdate" | "Email"
>;

export type PatientProfileField = keyof UpdatePatientProfileRequest;

export type PatientProfileErrorResponse = {
  Message?: string;
  Errors?: Partial<Record<PatientProfileField, string>>;
};
