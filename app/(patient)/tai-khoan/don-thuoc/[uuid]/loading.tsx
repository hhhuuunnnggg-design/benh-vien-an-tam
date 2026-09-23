import { LoadingState } from "@/components/shared/data-state";

export default function PrescriptionDetailLoading() {
  return (
    <div className="container-shell py-10 sm:py-14">
      <LoadingState label="Đang mở đơn thuốc" />
    </div>
  );
}
