import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { DetailImage } from "@/components/detail/detail-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DetailShellProps = {
  listHref: string;
  listLabel: string;
  eyebrow: string;
  title: string;
  image: string;
  fallbackImage: string;
  bookingHref: string;
  facts: { label: string; value: ReactNode }[];
  sections: { id: string; label: string }[];
  children: ReactNode;
};

export function DetailShell({
  listHref,
  listLabel,
  eyebrow,
  title,
  image,
  fallbackImage,
  bookingHref,
  facts,
  sections,
  children,
}: DetailShellProps) {
  return (
    <article className="container-shell pb-16 pt-6 sm:pb-20 sm:pt-8">
      <nav aria-label="Đường dẫn" className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="shrink-0 hover:text-foreground">
          Trang chủ
        </Link>
        <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
        <Link href={listHref} className="shrink-0 hover:text-foreground">
          {listLabel}
        </Link>
        <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
        <span aria-current="page" className="truncate text-foreground">
          {title}
        </span>
      </nav>

      <div className="mt-6 grid overflow-hidden border border-t-4 border-t-primary bg-card lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-64 bg-muted sm:min-h-80 lg:min-h-[26rem]">
          <DetailImage
            src={image}
            fallbackSrc={fallbackImage}
            alt={`Hình minh họa ${title}`}
          />
        </div>
        <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h1 className="mt-2 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h1>
          <dl className="mt-7 grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0 border-l-2 border-primary/30 pl-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 break-words text-sm font-medium leading-6">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href={bookingHref}
            className={cn(buttonVariants({ size: "lg" }), "mt-8 hidden h-11 w-fit px-6 lg:inline-flex")}
          >
            Đặt lịch ngay
          </Link>
        </div>
      </div>

      <div className="sticky bottom-3 z-30 mt-4 lg:hidden">
        <Link
          href={bookingHref}
          className={cn(buttonVariants({ size: "lg" }), "h-12 w-full border border-primary-foreground/20 shadow-md")}
        >
          Đặt lịch ngay
        </Link>
      </div>

      <nav aria-label="Nội dung trang" className="mt-8 overflow-x-auto border-b">
        <div className="flex min-w-max gap-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-t-lg px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mt-8 space-y-8">{children}</div>
    </article>
  );
}

export function DetailSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32 border bg-card p-5 sm:p-7">
      <h2 id={`${id}-title`} className="text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}
