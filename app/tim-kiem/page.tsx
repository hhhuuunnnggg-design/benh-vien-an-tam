import type { Metadata } from "next";
import { Suspense } from "react";

import {
  CombinedSearchPage,
  CombinedSearchSkeleton,
} from "@/components/discovery/combined-search-page";

export const metadata: Metadata = {
  title: "Tìm kiếm | Hospital Pro",
  description: "Tìm kiếm cơ sở y tế, bác sĩ và dịch vụ đang hoạt động.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<CombinedSearchSkeleton />}>
      <CombinedSearchPage />
    </Suspense>
  );
}
