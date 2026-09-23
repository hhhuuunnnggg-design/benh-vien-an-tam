import { Skeleton } from "@/components/ui/skeleton";

export function DetailSkeleton() {
  return (
    <div className="container-shell py-8">
      <Skeleton className="h-5 w-72 max-w-full" />
      <div className="mt-6 grid overflow-hidden rounded-2xl border lg:grid-cols-2">
        <Skeleton className="min-h-72 rounded-none lg:min-h-[26rem]" />
        <div className="space-y-5 p-6 sm:p-10">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-11 w-36" />
        </div>
      </div>
      <Skeleton className="mt-8 h-52 rounded-xl" />
      <Skeleton className="mt-6 h-52 rounded-xl" />
    </div>
  );
}
