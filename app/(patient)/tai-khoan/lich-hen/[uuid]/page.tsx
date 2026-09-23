import type { Metadata } from "next";

import { AppointmentDetail } from "@/components/appointments/appointment-detail";

export const metadata: Metadata = { title: "Chi tiết lịch hẹn" };

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return <AppointmentDetail uuid={uuid} />;
}
