"use client";

import { ErrorState } from "@/components/shared/data-state";

export function DetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-shell py-12">
      <ErrorState
        message="Không thể tải thông tin chi tiết. Vui lòng thử lại."
        onRetry={reset}
      />
    </div>
  );
}
