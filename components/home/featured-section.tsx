import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FeaturedSectionProps = {
  title: string;
  description: string;
  href: string;
  eyebrow?: string;
  muted?: boolean;
  children: ReactNode;
};

export function FeaturedSection({
  title,
  description,
  href,
  eyebrow,
  muted = false,
  children,
}: FeaturedSectionProps) {
  return (
    <section className={cn(muted && "border-y bg-muted/40")}>
      <div className="container-shell py-12 sm:py-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            {eyebrow ? <p className="text-sm font-semibold text-primary">{eyebrow}</p> : null}
            <h2 className={cn("text-2xl font-bold tracking-tight sm:text-3xl", eyebrow && "mt-2")}>{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
          <Link
            href={href}
            className="hidden shrink-0 items-center gap-1 rounded-md text-sm font-semibold text-primary hover:underline sm:flex"
          >
            Xem tất cả
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        {children}
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1 rounded-md text-sm font-semibold text-primary hover:underline sm:hidden"
        >
          Xem tất cả
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
