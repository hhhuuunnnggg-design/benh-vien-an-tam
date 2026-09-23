import type { Metadata } from "next";

import { AppointmentsPage } from "@/components/appointments/appointments-page";

export const metadata: Metadata = { title: "Lịch hẹn" };

export default function PatientAppointmentsPage() {
  return <AppointmentsPage />;
}
