import type { Metadata } from "next";
import { Suspense } from "react";

import {
  HospitalDirectory,
  HospitalDirectorySkeleton,
} from "@/components/hospitals/hospital-directory";

export const metadata: Metadata = {
  title: "Cơ sở y tế | Hospital Pro",
  description: "Tìm cơ sở y tế đang hoạt động theo tên và khoa cần khám.",
};

export default function HospitalsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-shell py-10 sm:py-14">
          <HospitalDirectorySkeleton />
        </div>
      }
    >
      <HospitalDirectory />
    </Suspense>
  );
}
