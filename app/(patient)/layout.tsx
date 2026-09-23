import type { ReactNode } from "react";

import { PatientRouteGuard } from "@/components/auth/patient-route-guard";

export default function PatientLayout({ children }: { children: ReactNode }) {
  return <PatientRouteGuard>{children}</PatientRouteGuard>;
}
