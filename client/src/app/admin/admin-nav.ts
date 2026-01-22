export type AdminNavItem = {
  label: string;
  href: string;
};

export const adminNav: AdminNavItem[] = [
  { label: "Overview", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Inventory", href: "/admin/inventory" },
  { label: "CRM", href: "/admin/crm" },
  { label: "ERP", href: "/admin/erp" },
  { label: "Delivery", href: "/admin/deliveries" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Settings", href: "/admin/settings" },
];
