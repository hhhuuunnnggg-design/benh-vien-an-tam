import { Skeleton } from "@/components/ui/skeleton";

export function BookingSkeleton() {
  return (
    <div className="container-shell py-10 sm:py-14">
      <Skeleton className="h-9 w-72 max-w-full" />
      <Skeleton className="mt-3 h-5 w-96 max-w-full" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-[32rem] rounded-xl" />
      </div>
    </div>
  );
}
