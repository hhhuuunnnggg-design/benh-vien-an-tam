import { notFound } from "next/navigation";

import { PortalShell } from "@/components/internal/portal-shell";
import { getInternalPortal } from "@/lib/internal-portal";

export default async function InternalPortalLayout({
  children,
  params,
}: LayoutProps<"/noi-bo/[role]">) {
  const { role } = await params;
  const portal = getInternalPortal(role);

  if (!portal) {
    notFound();
  }

  return (
    <PortalShell roleSlug={role} portal={portal}>
      {children}
    </PortalShell>
  );
}
