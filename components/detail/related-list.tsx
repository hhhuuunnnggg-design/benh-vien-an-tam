import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type RelatedListItem = {
  href: string;
  title: string;
  description?: string;
};

export function RelatedList({
  items,
  emptyMessage,
}: {
  items: RelatedListItem[];
  emptyMessage: string;
}) {
  if (!items.length) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex min-w-0 items-start gap-3 rounded-xl border p-4 hover:border-primary/45"
        >
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold group-hover:text-primary">{item.title}</h3>
            {item.description ? (
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </div>
          <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
        </Link>
      ))}
    </div>
  );
}
