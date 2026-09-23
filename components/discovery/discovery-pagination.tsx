import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DiscoveryPaginationProps = {
  pathname: string;
  currentParams: string;
  page: number;
  totalPages: number;
};

export function DiscoveryPagination({
  pathname,
  currentParams,
  page,
  totalPages,
}: DiscoveryPaginationProps) {
  if (totalPages <= 1) return null;

  function getHref(nextPage: number) {
    const params = new URLSearchParams(currentParams);
    if (nextPage === 1) params.delete("page");
    else params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  return (
    <nav aria-label="Phân trang" className="mt-8 flex items-center justify-center gap-3">
      {page > 1 ? (
        <Link
          href={getHref(page - 1)}
          className={cn(buttonVariants({ variant: "outline" }), "gap-1")}
        >
          <ChevronLeft aria-hidden="true" />
          Trước
        </Link>
      ) : null}
      <span className="text-sm text-muted-foreground">
        Trang {page} / {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={getHref(page + 1)}
          className={cn(buttonVariants({ variant: "outline" }), "gap-1")}
        >
          Sau
          <ChevronRight aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  );
}
