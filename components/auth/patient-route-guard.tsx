"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { LoadingState } from "@/components/shared/data-state";

export function PatientRouteGuard({ children }: { children: ReactNode }) {
  const { session, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      const returnUrl = encodeURIComponent(
        `${window.location.pathname}${window.location.search}${window.location.hash}`,
      );
      router.replace(`/dang-nhap?returnUrl=${returnUrl}`);
    }
  }, [isLoading, pathname, router, session]);

  if (isLoading || !session) {
    return (
      <div className="container-shell py-12">
        <LoadingState
          label={isLoading ? "Đang kiểm tra phiên đăng nhập" : "Đang chuyển đến đăng nhập"}
        />
      </div>
    );
  }

  return children;
}
