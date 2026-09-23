import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted/45 py-10 sm:py-14">
      <div className="container-shell grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="hidden rounded-2xl border bg-primary p-8 text-primary-foreground lg:block">
          <ShieldCheck aria-hidden="true" className="size-10" />
          <h2 className="mt-8 text-2xl font-bold leading-tight">
            Quản lý hành trình chăm sóc của chính bạn
          </h2>
          <p className="mt-4 text-sm leading-7 text-primary-foreground/85">
            Tài khoản Patient giúp bạn theo dõi lịch hẹn, hồ sơ và đơn thuốc
            trong đúng phạm vi cá nhân.
          </p>
        </aside>
        {children}
      </div>
    </div>
  );
}
