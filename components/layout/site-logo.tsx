import { Cross } from "lucide-react";
import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center gap-2.5 font-semibold tracking-tight"
      aria-label="AnTam - Trang chủ"
    >
      <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
        <Cross aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </span>
      <span className="text-xl font-bold tracking-[-0.04em] text-[#075d8a]">AnTam</span>
    </Link>
  );
}
