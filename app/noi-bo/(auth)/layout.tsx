import { Cross, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function InternalAuthLayout({ children }: { children: ReactNode }) {
  return (
    <main id="noi-dung-noi-bo" className="min-h-screen bg-[#edf5f8] p-4 sm:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-5xl overflow-hidden border bg-white sm:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden flex-col justify-between bg-[#123f5b] p-10 text-white lg:flex">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-md bg-[#ffc94a] text-[#173b57]">
              <Cross aria-hidden="true" className="size-5" strokeWidth={2.5} />
            </span>
            <span>
              <strong className="block text-xl">AnTam</strong>
              <span className="text-xs text-white/60">Hệ thống nội bộ</span>
            </span>
          </Link>
          <div>
            <ShieldCheck aria-hidden="true" className="size-10 text-[#72d7ff]" />
            <h2 className="mt-6 text-3xl font-bold leading-tight">Không gian làm việc theo đúng vai trò</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
              Mỗi tài khoản chỉ truy cập dữ liệu và nghiệp vụ trong phạm vi được phân công. Mọi thao tác quan trọng được ghi nhận để kiểm toán.
            </p>
          </div>
          <p className="text-xs text-white/45">AnTam Internal Portal · Truy cập được kiểm soát</p>
        </aside>
        <div className="flex items-center justify-center p-5 sm:p-10">{children}</div>
      </div>
    </main>
  );
}
