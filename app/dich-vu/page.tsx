import type { Metadata } from "next";
import { Suspense } from "react";

import {
  MedicalServiceDirectory,
  MedicalServiceDirectorySkeleton,
} from "@/components/medical-services/medical-service-directory";

export const metadata: Metadata = {
  title: "Dịch vụ y tế | Hospital Pro",
  description: "Tra cứu nội dung, chi phí và cơ sở cung cấp dịch vụ y tế.",
};

export default function MedicalServicesPage() {
  return (
    <Suspense fallback={<MedicalServiceDirectorySkeleton />}>
      <MedicalServiceDirectory />
    </Suspense>
  );
}
