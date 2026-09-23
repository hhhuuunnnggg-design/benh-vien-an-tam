import { Skeleton } from "@/components/ui/skeleton";

export function DiscoveryPageSkeleton() {
  return (
    <div className="container-shell py-10 sm:py-14">
      <Skeleton className="h-9 w-64 max-w-full" />
      <Skeleton className="mt-3 h-5 w-96 max-w-full" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <Skeleton className="hidden h-64 rounded-xl lg:block" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-96 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
