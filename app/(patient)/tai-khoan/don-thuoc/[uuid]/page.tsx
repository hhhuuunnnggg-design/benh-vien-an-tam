import type { Metadata } from "next";

import { PrescriptionDetail } from "@/components/prescriptions/prescription-detail";

export const metadata: Metadata = { title: "Chi tiết đơn thuốc" };

export default async function PrescriptionDetailPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return <PrescriptionDetail uuid={uuid} />;
}
