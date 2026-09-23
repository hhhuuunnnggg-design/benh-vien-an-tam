"use client";

import { ArrowLeft, CheckCircle2, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { internalPortals, internalRoleSlugs, type InternalRoleSlug } from "@/lib/internal-portal";

export function InternalAuthForm({ mode }: { mode: "login" | "forgot-password" }) {
  const router = useRouter();
  const [role, setRole] = useState<InternalRoleSlug>("hospital-admin");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    if (mode === "forgot-password") {
      window.setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 400);
      return;
    }

    router.push(`/noi-bo/${role}/tong-quan`);
  }

  if (submitted) {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-11 text-emerald-600" />
        <h2 className="mt-4 text-xl font-bold">Đã tiếp nhận yêu cầu</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu sẽ được gửi đến bạn.
        </p>
        <Button className="mt-6" variant="outline" render={<Link href="/noi-bo/dang-nhap" />}>
          <ArrowLeft aria-hidden="true" />
          Quay lại đăng nhập
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {mode === "login" ? (
        <div className="space-y-2">
          <Label htmlFor="internal-role">Cổng làm việc</Label>
          <Select value={role} onValueChange={(value) => setRole(value as InternalRoleSlug)}>
            <SelectTrigger id="internal-role" className="h-11 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {internalRoleSlugs.map((slug) => (
                <SelectItem key={slug} value={slug}>{internalPortals[slug].name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="internal-email">Email công việc</Label>
        <Input id="internal-email" name="email" type="email" autoComplete="email" required placeholder="ten@benhvien.vn" className="h-11" />
      </div>

      {mode === "login" ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="internal-password">Mật khẩu</Label>
            <Link href="/noi-bo/quen-mat-khau" className="text-xs font-semibold text-primary hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Input id="internal-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="h-11 pr-11" />
            <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
              {showPassword ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
            </button>
          </div>
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : null}
        {mode === "login" ? "Vào cổng làm việc" : "Gửi hướng dẫn đặt lại"}
      </Button>

      {mode === "forgot-password" ? (
        <Link href="/noi-bo/dang-nhap" className="flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Quay lại đăng nhập
        </Link>
      ) : null}
    </form>
  );
}
