"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import CustomerProfileHeader from "@/components/crm/CustomerProfileHeader";
import type { ReactNode } from "react";

const getTabs = (customerId: string) => [
  { label: "Overview", href: `/ops/crm/customer360/${customerId}/profile` },
  { label: "Orders", href: `/ops/crm/customer360/${customerId}/orders` },
  { label: "Loyalty", href: `/ops/crm/customer360/${customerId}/loyalty` },
  { label: "Wallet & Outstanding", href: `/ops/crm/customer360/${customerId}/wallet` },
  { label: "Preferences", href: `/ops/crm/customer360/${customerId}/preferences` },
  { label: "Wishlist & Favorites", href: `/ops/crm/customer360/${customerId}/wishlist` },
  { label: "Insights", href: `/ops/crm/customer360/${customerId}/insights` },
  { label: "Addresses", href: `/ops/crm/customer360/${customerId}/addresses` },
  { label: "Notes & Tasks", href: `/ops/crm/customer360/${customerId}/notes` },
  { label: "Comms", href: `/ops/crm/customer360/${customerId}/communication` },
  { label: "Recommendations", href: `/ops/crm/customer360/${customerId}/recommendations` },
  { label: "Timeline", href: `/ops/crm/customer360/${customerId}/timeline` },
  { label: "Risk & Opportunities", href: `/ops/crm/customer360/${customerId}/risk` },
];

type Customer360ShellProps = {
  customerId: string;
  children: ReactNode;
};

export default function Customer360Shell({ customerId, children }: Customer360ShellProps) {
  const pathname = usePathname();
  const tabs = getTabs(customerId);

  return (
    <div className="space-y-6">
      <CustomerProfileHeader
        name="Naina Kapoor"
        tier="Gold"
        churnRisk="Moderate"
        outstanding="$126"
        tags={["Repeat Buyer", "High CLV", "Prefers Delivery"]}
      />

      <section className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  "rounded-full px-3 py-2 text-xs font-semibold transition",
                  active
                    ? "bg-[#1f7a6b] text-white"
                    : "bg-[#f7f5f0] text-[#4b4a47] hover:bg-[#efeae2]"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </section>

      {children}
    </div>
  );
}
