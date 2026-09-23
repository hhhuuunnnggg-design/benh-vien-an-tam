import type { Account, PatientProfile } from "@/types/models";

export type PublicAccount = Omit<Account, "Password">;

export type AuthSession = {
  Account: PublicAccount;
  PatientProfile: PatientProfile;
};

export type LoginRequest = Pick<Account, "Phone" | "Password">;

export type RegisterPatientRequest = {
  Account: Pick<Account, "Phone" | "Password">;
  PatientProfile: Pick<
    PatientProfile,
    "Name" | "Gender" | "Birthdate" | "Email"
  >;
};

export type AuthField =
  | "Phone"
  | "Password"
  | "Name"
  | "Gender"
  | "Birthdate"
  | "Email";

export type AuthErrorResponse = {
  Message?: string;
  Errors?: Partial<Record<AuthField, string>>;
};
