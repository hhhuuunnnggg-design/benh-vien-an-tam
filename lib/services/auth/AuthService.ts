import axios from "axios";

import { httpClient } from "@/lib/http/client";
import type { ApiResponse } from "@/lib/http/response";
import type {
  AuthErrorResponse,
  AuthField,
  AuthSession,
  LoginRequest,
  RegisterPatientRequest,
} from "@/types/auth";
import { BaseStatus, ROLE_UUIDS } from "@/types/models";
import type { PatientProfile } from "@/types/models";

const sessionStorageKey = "an-tam-y-te.patient-session";
const mockAccountHeader = "X-Mock-Account-Uuid";

function setMockAccountHeader(accountUuid?: string) {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "false") return;
  if (accountUuid) {
    httpClient.defaults.headers.common[mockAccountHeader] = accountUuid;
  } else {
    delete httpClient.defaults.headers.common[mockAccountHeader];
  }
}

export class AuthServiceError extends Error {
  constructor(
    message: string,
    public readonly fieldErrors: Partial<Record<AuthField, string>> = {},
  ) {
    super(message);
    this.name = "AuthServiceError";
  }
}

function toAuthError(error: unknown) {
  if (axios.isAxiosError<AuthErrorResponse>(error)) {
    return new AuthServiceError(
      error.response?.data?.Message ??
        "Không thể kết nối đến hệ thống. Vui lòng thử lại.",
      error.response?.data?.Errors,
    );
  }

  return new AuthServiceError("Đã xảy ra lỗi. Vui lòng thử lại.");
}

function hydrateSession(value: string): AuthSession | null {
  try {
    const session = JSON.parse(value) as AuthSession;

    if (
      session.Account.RoleUuid !== ROLE_UUIDS.PATIENT ||
      session.Account.Status !== BaseStatus.Active ||
      !session.Account.Uuid ||
      !session.PatientProfile?.Uuid
    ) {
      return null;
    }

    return {
      Account: {
        ...session.Account,
        CreatedAt: new Date(session.Account.CreatedAt),
        UpdatedAt: new Date(session.Account.UpdatedAt),
        DeletedAt: new Date(session.Account.DeletedAt),
      },
      PatientProfile: {
        ...session.PatientProfile,
        Birthdate: new Date(session.PatientProfile.Birthdate),
      },
    };
  } catch {
    return null;
  }
}

export class AuthService {
  async login(credentials: LoginRequest): Promise<AuthSession> {
    try {
      const response = await httpClient.post<ApiResponse<AuthSession>>(
        "/auth/login",
        credentials,
      );
      const session = response.data.Data;

      localStorage.setItem(sessionStorageKey, JSON.stringify(session));
      setMockAccountHeader(session.Account.Uuid);
      return session;
    } catch (error) {
      throw toAuthError(error);
    }
  }

  async register(request: RegisterPatientRequest): Promise<void> {
    try {
      await httpClient.post<ApiResponse<null>>("/auth/register", request);
    } catch (error) {
      throw toAuthError(error);
    }
  }

  async getCurrentSession(): Promise<AuthSession | null> {
    const storedSession = localStorage.getItem(sessionStorageKey);
    if (!storedSession) {
      setMockAccountHeader();
      return null;
    }

    const session = hydrateSession(storedSession);
    if (!session) {
      localStorage.removeItem(sessionStorageKey);
      setMockAccountHeader();
    } else {
      setMockAccountHeader(session.Account.Uuid);
    }

    return session;
  }

  async logout(): Promise<void> {
    try {
      await httpClient.post<ApiResponse<null>>("/auth/logout");
    } finally {
      localStorage.removeItem(sessionStorageKey);
      setMockAccountHeader();
    }
  }

  persistPatientProfile(profile: PatientProfile) {
    const storedSession = localStorage.getItem(sessionStorageKey);
    if (!storedSession) return;
    const session = hydrateSession(storedSession);
    if (!session || session.Account.Uuid !== profile.AccountUuid) return;
    localStorage.setItem(
      sessionStorageKey,
      JSON.stringify({ ...session, PatientProfile: profile }),
    );
  }
}

export const authService = new AuthService();
