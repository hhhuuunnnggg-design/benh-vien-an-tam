import { BranchScreens } from "@/components/internal/trang-tong/branch-screens";
import { ClinicalScreens } from "@/components/internal/trang-tong/clinical-screens";
import { InventoryScreens } from "@/components/internal/trang-tong/inventory-screens";
import { ReceptionScreens } from "@/components/internal/trang-tong/reception-screens";
import { SystemScreens } from "@/components/internal/trang-tong/system-screens";
import type { CombinedPortalArea } from "@/lib/combined-internal-portal";

export function CombinedPortalScreen({ area, slug }: { area: CombinedPortalArea; slug: string }) {
  switch (area) {
    case "system":
      return <SystemScreens slug={slug} />;
    case "branch":
      return <BranchScreens slug={slug} />;
    case "clinical":
      return <ClinicalScreens slug={slug} />;
    case "reception":
      return <ReceptionScreens slug={slug} />;
    case "inventory":
      return <InventoryScreens slug={slug} />;
  }
}
