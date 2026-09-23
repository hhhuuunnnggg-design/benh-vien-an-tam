import { ArrowRight, CalendarPlus } from "lucide-react";
import Link from "next/link";

import { SiteLogo } from "@/components/layout/site-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const footerGroups = [
  {
    title: "Khám phá",
    links: [
      { label: "Cơ sở y tế", href: "/co-so-y-te" },
      { label: "Bác sĩ", href: "/bac-si" },
      { label: "Dịch vụ y tế", href: "/dich-vu" },
      { label: "Tìm kiếm tổng hợp", href: "/tim-kiem" },
    ],
  },
  {
    title: "Dành cho người bệnh",
    links: [
      { label: "Đặt lịch khám", href: "/dat-lich/co-so-y-te" },
      { label: "Lịch hẹn của tôi", href: "/tai-khoan/lich-hen" },
      { label: "Đơn thuốc", href: "/tai-khoan/don-thuoc" },
      { label: "Hồ sơ cá nhân", href: "/tai-khoan" },
    ],
  },
  {
    title: "AnTam",
    links: [
      { label: "Về chúng tôi", href: "/ve-chung-toi" },
      { label: "Đăng nhập", href: "/dang-nhap" },
      { label: "Đăng ký tài khoản", href: "/dang-ky" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-[#063b5c] text-white">
      <div className="container-shell">
        <section className="flex flex-col gap-6 border-b border-white/15 py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#72d7ff]">
              Chủ động cho lịch khám tiếp theo
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Tìm lựa chọn phù hợp và đặt lịch ngay
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Bắt đầu từ cơ sở, bác sĩ hoặc dịch vụ bạn đang quan tâm.
            </p>
          </div>
          <Link
            href="/dat-lich/co-so-y-te"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "shrink-0 bg-[#ffc94a] text-[#173b57] hover:bg-[#ffbd24]",
            )}
          >
            <CalendarPlus aria-hidden="true" />
            Đặt lịch khám
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.9fr_0.75fr] lg:py-12">
          <div>
            <div className="inline-flex rounded-md bg-white px-3 py-2"><SiteLogo /></div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              Nền tảng hỗ trợ người bệnh tìm hiểu cơ sở y tế, bác sĩ, dịch vụ và quản lý hành trình đặt lịch trên một trải nghiệm thống nhất.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-bold">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-[#72d7ff]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 py-5 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AnTam. Dành cho hành trình chăm sóc chủ động.</p>
          <p>Hỗ trợ truy cập thuận tiện trên máy tính và thiết bị di động.</p>
        </div>
      </div>
    </footer>
  );
}
