"use client";

import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function LoadingState({ label = "Đang tải dữ liệu" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border bg-card p-6 text-center"
    >
      <LoaderCircle
        aria-hidden="true"
        className="size-6 animate-spin text-primary"
      />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = "Không thể tải dữ liệu. Vui lòng thử lại.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-card p-6 text-center"
    >
      <AlertCircle aria-hidden="true" className="size-6 text-destructive" />
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          Thử lại
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  message = "Chưa có dữ liệu để hiển thị.",
  action,
}: {
  message?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card p-6 text-center">
      <Inbox aria-hidden="true" className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {action}
    </div>
  );
}
