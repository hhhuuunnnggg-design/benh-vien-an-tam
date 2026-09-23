import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DiscoverySearchFormProps = {
  action: string;
  query: string;
  placeholder: string;
  hiddenParams?: Record<string, string>;
};

export function DiscoverySearchForm({
  action,
  query,
  placeholder,
  hiddenParams = {},
}: DiscoverySearchFormProps) {
  return (
    <form
      key={`${action}-${query}-${JSON.stringify(hiddenParams)}`}
      action={action}
      method="get"
      role="search"
      className="flex min-w-0 flex-col gap-2 sm:flex-row"
    >
      {Object.entries(hiddenParams).map(([name, value]) =>
        value ? <input key={name} type="hidden" name={name} value={value} /> : null,
      )}
      <div className="relative min-w-0 flex-1">
        <Search
          aria-hidden="true"
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          name="q"
          defaultValue={query}
          aria-label={placeholder}
          placeholder={placeholder}
          className="h-10 pl-9"
        />
      </div>
      <Button type="submit" className="h-10 px-5">
        Tìm kiếm
      </Button>
    </form>
  );
}
