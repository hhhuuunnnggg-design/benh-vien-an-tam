import type { Metadata } from "next";

import { PrescriptionsPage } from "@/components/prescriptions/prescriptions-page";

export const metadata: Metadata = { title: "Đơn thuốc" };

export default function PatientPrescriptionsPage() {
  return <PrescriptionsPage />;
}
