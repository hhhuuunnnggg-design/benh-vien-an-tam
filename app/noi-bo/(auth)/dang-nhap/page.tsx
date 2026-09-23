import type { Metadata } from "next";

import { InternalAuthForm } from "@/components/internal/internal-auth-form";

export const metadata: Metadata = {
  title: "Đăng nhập nội bộ",
  description: "Đăng nhập cổng làm việc dành cho nhân sự AnTam.",
};

export default function InternalLoginPage() {
  return (
    <section className="w-full max-w-md">
      <p className="text-sm font-semibold text-primary">AnTam Internal Portal</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#173b57]">Đăng nhập nội bộ</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Sử dụng tài khoản công việc đã được quản trị viên cấp.
      </p>
      <div className="mt-8">
        <InternalAuthForm mode="login" />
      </div>
    </section>
  );
}
