import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";
import { getSafeReturnUrl } from "@/lib/auth/return-url";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản người bệnh.",
};

type RegisterPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const rawReturnUrl = Array.isArray(params.returnUrl)
    ? params.returnUrl[0]
    : params.returnUrl;
  const returnUrl = getSafeReturnUrl(rawReturnUrl);

  return (
    <section className="w-full rounded-2xl border bg-card p-5 sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold text-primary">Dành cho người bệnh</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Tạo tài khoản</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Nhập thông tin chính xác để tạo tài khoản và hồ sơ cá nhân.
        </p>
      </div>
      <RegisterForm returnUrl={returnUrl} />
    </section>
  );
}
