import { PrescriptionStatus } from "@/types/models";
import { formatPrice } from "@/lib/format";

const statusConfig = {
  [PrescriptionStatus.Unpaid]: {
    label: "Chưa thanh toán",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  [PrescriptionStatus.Paid]: {
    label: "Đã thanh toán",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  [PrescriptionStatus.Cancelled]: {
    label: "Đã hủy",
    className: "border-red-200 bg-red-50 text-red-700",
  },
};

export function PrescriptionStatusBadge({
  status,
}: {
  status: PrescriptionStatus;
}) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export function formatPrescriptionTotal(total: number | null) {
  return total === null ? "Chưa xác định" : formatPrice(total);
}
