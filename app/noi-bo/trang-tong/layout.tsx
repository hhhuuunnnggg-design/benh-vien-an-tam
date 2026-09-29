import type { ReactNode } from "react";

import { PortalShell, type PortalNavigationGroup } from "@/components/internal/portal-shell";
import { combinedPortalSections, type PortalDefinition } from "@/lib/combined-internal-portal";

const combinedPortal: PortalDefinition = {
  context: "Không gian làm việc nội bộ",
  name: "Cổng nội bộ tổng hợp",
  scope: "Tất cả nhóm quyền hiện có",
  description: "Tổng hợp các chức năng nội bộ trong một cổng làm việc.",
};

const navigationGroups: PortalNavigationGroup[] = combinedPortalSections.map((section) => ({
  label: section.label,
  items: section.items.map((item) => ({
    ...item,
    href: `/noi-bo/trang-tong/${item.slug}`,
  })),
}));

export default function CombinedInternalPortalLayout({ children }: { children: ReactNode }) {
  return (
    <PortalShell portal={combinedPortal} navigationGroups={navigationGroups}>
      {children}
    </PortalShell>
  );
}
