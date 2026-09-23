import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { getSafeReturnUrl } from "@/lib/auth/return-url";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản người bệnh.",
};

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const rawReturnUrl = Array.isArray(params.returnUrl)
    ? params.returnUrl[0]
    : params.returnUrl;
  const returnUrl = getSafeReturnUrl(rawReturnUrl);
  const registered = params.registered === "1";

  return (
    <section className="w-full rounded-2xl border bg-card p-5 sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold text-primary">Tài khoản Patient</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Đăng nhập</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sử dụng số điện thoại và mật khẩu đã đăng ký.
        </p>
      </div>
      <LoginForm returnUrl={returnUrl} registered={registered} />
    </section>
  );
}
