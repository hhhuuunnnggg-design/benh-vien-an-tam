import { combinedPortalSections } from "@/lib/combined-internal-portal";
import type { Permission } from "@/types/models";

const uniqueItems = Array.from(
  new Map(combinedPortalSections.flatMap((section) => section.items).map((item) => [item.slug, item])).values(),
);

export const mockPermissions: Permission[] = uniqueItems.map((item, index) => ({
  Uuid: `20000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
  Icon: item.icon,
  Name: item.slug,
  Description: item.description,
}));
