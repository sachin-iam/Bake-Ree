"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import OpsSidebar from "@/components/ops/OpsSidebar";
import OpsSubSidebar from "@/components/ops/OpsSubSidebar";
import OpsHeader from "@/components/ops/OpsHeader";
import {
  getOpsBreadcrumbs,
  getOpsContext,
  getOpsDescription,
  getOpsTitle,
  opsCrmSubnav,
  opsErpSubnav,
} from "@/lib/ops/nav";

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubnavOpen, setIsSubnavOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSubnavOpen(false);
  }, [pathname]);

  const context = useMemo(() => getOpsContext(pathname), [pathname]);
  const subnavGroups = context === "erp" ? opsErpSubnav : context === "crm" ? opsCrmSubnav : null;
  const headerTitle = useMemo(() => getOpsTitle(pathname), [pathname]);
  const headerDescription = useMemo(() => getOpsDescription(pathname), [pathname]);
  const breadcrumbs = useMemo(() => getOpsBreadcrumbs(pathname), [pathname]);

  return (
    <div className="min-h-screen bg-[#f6efe6]">
      <div className="mx-auto flex max-w-[1480px] gap-4 px-4 py-4 lg:gap-6 lg:px-6 lg:py-6">
        <OpsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {subnavGroups && (
          <OpsSubSidebar
            title={context === "crm" ? "CRM" : "ERP"}
            groups={subnavGroups}
            isOpen={isSubnavOpen}
            onClose={() => setIsSubnavOpen(false)}
          />
        )}

        <div className="min-w-0 flex-1">
          <OpsHeader
            title={headerTitle}
            description={headerDescription}
            breadcrumbs={breadcrumbs}
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
            onToggleSubnav={subnavGroups ? () => setIsSubnavOpen((prev) => !prev) : undefined}
            showSubnavToggle={Boolean(subnavGroups)}
          />
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
