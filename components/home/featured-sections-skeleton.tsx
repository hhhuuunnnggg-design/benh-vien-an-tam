import { Skeleton } from "@/components/ui/skeleton";

const sections = [
  { key: "departments", count: 4, compact: true },
  { key: "hospitals", count: 3, compact: false },
  { key: "doctors", count: 3, compact: false },
  { key: "services", count: 3, compact: false },
];

export function FeaturedSectionsSkeleton() {
  return (
    <div role="status" aria-label="Đang tải nội dung nổi bật" className="divide-y">
      {sections.map((section) => (
        <section key={section.key} className="container-shell py-10 sm:py-14">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="mt-3 h-5 w-full max-w-lg" />
          <div
            className={
              section.compact
                ? "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                : "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {Array.from({ length: section.count }, (_, index) => (
              <div
                key={index}
                className={
                  section.compact
                    ? "flex h-[90px] items-center gap-4 rounded-xl border bg-card p-4"
                    : "overflow-hidden rounded-xl border bg-card"
                }
              >
                {section.compact ? (
                  <>
                    <Skeleton className="size-14 shrink-0 rounded-xl" />
                    <Skeleton className="h-5 w-28" />
                  </>
                ) : (
                  <>
                    <Skeleton className="aspect-[16/9] w-full rounded-none" />
                    <div className="space-y-3 p-5">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      <span className="sr-only">Đang tải dữ liệu</span>
    </div>
  );
}
