import Customer360Shell from "@/components/crm/Customer360Shell";
import type { ReactNode } from "react";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { customerId: string };
}) {
  return <Customer360Shell customerId={params.customerId}>{children}</Customer360Shell>;
}
