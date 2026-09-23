import type { Metadata } from "next";
import { Suspense } from "react";

import {
  DoctorDirectory,
  DoctorDirectorySkeleton,
} from "@/components/doctors/doctor-directory";

export const metadata: Metadata = {
  title: "Bác sĩ | Hospital Pro",
  description: "Tìm bác sĩ theo chuyên môn, cơ sở và chuyên khoa để đặt lịch khám.",
};

export default function DoctorsPage() {
  return (
    <Suspense fallback={<DoctorDirectorySkeleton />}>
      <DoctorDirectory />
    </Suspense>
  );
}
