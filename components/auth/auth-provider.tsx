"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { authService } from "@/lib/services/auth/AuthService";
import type {
  AuthSession,
  LoginRequest,
  RegisterPatientRequest,
} from "@/types/auth";
import type { PatientProfile } from "@/types/models";

type AuthContextValue = {
  session: AuthSession | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<AuthSession>;
  register: (request: RegisterPatientRequest) => Promise<void>;
  logout: () => Promise<void>;
  syncPatientProfile: (
    profile: PatientProfile,
    expectedSession: AuthSession,
  ) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const sessionRef = useRef<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    authService
      .getCurrentSession()
      .then((currentSession) => {
        if (active) {
          sessionRef.current = currentSession;
          setSession(currentSession);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  async function login(credentials: LoginRequest) {
    const nextSession = await authService.login(credentials);
    sessionRef.current = nextSession;
    setSession(nextSession);
    return nextSession;
  }

  async function register(request: RegisterPatientRequest) {
    await authService.register(request);
  }

  async function logout() {
    try {
      await authService.logout();
    } finally {
      sessionRef.current = null;
      setSession(null);
    }
  }

  function syncPatientProfile(
    profile: PatientProfile,
    expectedSession: AuthSession,
  ) {
    const currentSession = sessionRef.current;
    if (
      !currentSession ||
      currentSession !== expectedSession ||
      currentSession.Account.Uuid !== profile.AccountUuid
    ) {
      return;
    }
    const nextSession = { ...currentSession, PatientProfile: profile };
    authService.persistPatientProfile(profile);
    sessionRef.current = nextSession;
    setSession(nextSession);
  }

  return (
    <AuthContext.Provider
      value={{ session, isLoading, login, register, logout, syncPatientProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider.");
  }

  return context;
}
