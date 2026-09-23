import type { Metadata } from "next";
import { Suspense } from "react";

import { BookingConfirmation } from "@/components/booking/booking-confirmation";
import { BookingSkeleton } from "@/components/booking/booking-skeleton";

export const metadata: Metadata = {
  title: "Xác nhận đặt lịch",
  description: "Tóm tắt yêu cầu đặt lịch khám của người bệnh.",
};

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<BookingSkeleton />}>
      <BookingConfirmation />
    </Suspense>
  );
}
