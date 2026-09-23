import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { DoctorScreen } from "@/components/internal/roles/doctor-screens";
import { HospitalAdminScreen } from "@/components/internal/roles/hospital-admin-screens";
import { StaffScreen } from "@/components/internal/roles/staff-screens";
import { SystemAdminScreen } from "@/components/internal/roles/system-admin-screens";
import { WarehouseManagerScreen } from "@/components/internal/roles/warehouse-manager-screens";
import {
  getInternalPortal,
  getInternalPortalPage,
  internalPortals,
  internalRoleSlugs,
} from "@/lib/internal-portal";

type InternalPortalPageProps = {
  params: Promise<{ role: string; slug?: string[] }>;
};

export function generateStaticParams() {
  return internalRoleSlugs.flatMap((role) =>
    internalPortals[role].navigation.map((item) => ({ role, slug: [item.slug] })),
  );
}

export async function generateMetadata({ params }: InternalPortalPageProps): Promise<Metadata> {
  const { role, slug } = await params;
  const page = slug?.length === 1 ? getInternalPortalPage(role, slug[0]) : undefined;

  return {
    title: page?.label ?? "Cổng nội bộ",
    description: page?.description,
  };
}

export default async function InternalPortalPage({ params }: InternalPortalPageProps) {
  const { role, slug } = await params;
  const portal = getInternalPortal(role);

  if (!portal) {
    notFound();
  }
  if (!slug?.length) {
    redirect(`/noi-bo/${role}/tong-quan`);
  }
  if (slug.length !== 1) {
    notFound();
  }

  const page = getInternalPortalPage(role, slug[0]);
  if (!page) {
    notFound();
  }

  switch (role) {
    case "system-admin":
      return <SystemAdminScreen slug={page.slug} />;
    case "hospital-admin":
      return <HospitalAdminScreen slug={page.slug} />;
    case "doctor":
      return <DoctorScreen slug={page.slug} />;
    case "staff":
      return <StaffScreen slug={page.slug} />;
    case "warehouse-manager":
      return <WarehouseManagerScreen slug={page.slug} />;
    default:
      notFound();
  }
}
