import { SearchX } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[55vh] items-center justify-center py-16 text-center">
      <div className="max-w-lg">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <SearchX aria-hidden="true" className="size-6" />
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight">
          Không tìm thấy thông tin
        </h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          Nội dung có thể không tồn tại hoặc hiện không khả dụng công khai.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/tim-kiem" className={buttonVariants()}>
            Tìm lựa chọn khác
          </Link>
          <Link
            href="/"
            className={buttonVariants({ variant: "outline" })}
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
