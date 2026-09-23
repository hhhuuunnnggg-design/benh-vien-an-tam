import type { Metadata } from "next";

import { PatientProfilePage } from "@/components/patient/patient-profile-page";

export const metadata: Metadata = { title: "Tài khoản" };

export default function ProfilePage() {
  return <PatientProfilePage />;
}
