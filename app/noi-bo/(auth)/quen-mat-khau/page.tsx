import type { Metadata } from "next";

import { InternalAuthForm } from "@/components/internal/internal-auth-form";

export const metadata: Metadata = {
  title: "Khôi phục mật khẩu nội bộ",
  description: "Yêu cầu đặt lại mật khẩu cho tài khoản nhân sự AnTam.",
};

export default function InternalForgotPasswordPage() {
  return (
    <section className="w-full max-w-md">
      <p className="text-sm font-semibold text-primary">Bảo mật tài khoản</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#173b57]">Quên mật khẩu?</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Nhập email công việc để nhận hướng dẫn đặt lại mật khẩu.
      </p>
      <div className="mt-8">
        <InternalAuthForm mode="forgot-password" />
      </div>
    </section>
  );
}
