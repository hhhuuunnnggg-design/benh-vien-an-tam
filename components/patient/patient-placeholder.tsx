import { Clock3 } from "lucide-react";

export function PatientPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="container-shell py-12 sm:py-16">
      <section className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Clock3 aria-hidden="true" className="size-5" />
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>
      </section>
    </div>
  );
}
