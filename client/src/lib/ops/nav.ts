import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  CreditCard,
  Factory,
  Gift,
  Home,
  LineChart,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

export type OpsTopNavItem = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export type OpsSubNavItem = {
  label: string;
  href: string;
  description: string;
};

export type OpsSubNavGroup = {
  key: string;
  label: string;
  items: OpsSubNavItem[];
};

export type OpsRouteMeta = {
  href: string;
  label: string;
  description: string;
};

export const opsTopNav: OpsTopNavItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/ops",
    icon: Home,
    description: "Unified operations overview across orders, production, and service health.",
  },
  {
    key: "orders",
    label: "Orders",
    href: "/ops/orders",
    icon: ClipboardList,
    description: "Track live demand, exceptions, and service commitments.",
  },
  {
    key: "production",
    label: "Production",
    href: "/ops/production",
    icon: Factory,
    description: "Plan batches, manage work orders, and maintain yield quality.",
  },
  {
    key: "inventory",
    label: "Inventory",
    href: "/ops/inventory",
    icon: Boxes,
    description: "Monitor stock positions, movements, and expiry risk.",
  },
  {
    key: "procurement",
    label: "Procurement",
    href: "/ops/procurement",
    icon: ShoppingCart,
    description: "Control vendor sourcing, purchase cycles, and receipts.",
  },
  {
    key: "logistics",
    label: "Logistics",
    href: "/ops/logistics",
    icon: Truck,
    description: "Coordinate deliveries, routes, and fleet performance.",
  },
  {
    key: "crm",
    label: "Customers (CRM)",
    href: "/ops/crm",
    icon: Users,
    description: "Customer 360 views, lifecycle insights, and engagement workflows.",
  },
  {
    key: "loyalty",
    label: "Loyalty & Rewards",
    href: "/ops/loyalty",
    icon: Gift,
    description: "Reward rules, redemptions, and membership tier governance.",
  },
  {
    key: "finance",
    label: "Finance",
    href: "/ops/finance",
    icon: CreditCard,
    description: "Invoicing, payments, taxes, and margin control.",
  },
  {
    key: "analytics",
    label: "Analytics",
    href: "/ops/analytics",
    icon: LineChart,
    description: "Operational, CRM, and revenue performance analytics.",
  },
  {
    key: "settings",
    label: "Settings",
    href: "/ops/settings",
    icon: Settings,
    description: "Configuration, roles, and compliance settings for the console.",
  },
];

export const opsErpSubnav: OpsSubNavGroup[] = [
  {
    key: "orders",
    label: "Orders",
    items: [
      {
        label: "Orders Dashboard",
        href: "/ops/orders",
        description: "Live order performance, SLA adherence, and escalations.",
      },
      {
        label: "All Orders",
        href: "/ops/orders/all",
        description: "End-to-end order ledger across channels and stores.",
      },
      {
        label: "POS / Counter Orders",
        href: "/ops/orders/pos",
        description: "In-store counter tickets and cashier throughput.",
      },
      {
        label: "Subscriptions / Scheduled",
        href: "/ops/orders/subscriptions",
        description: "Scheduled deliveries and subscription commitments.",
      },
      {
        label: "Returns / Refunds",
        href: "/ops/orders/refunds",
        description: "Return approvals, refund timelines, and root-cause notes.",
      },
      {
        label: "SLA & Exceptions",
        href: "/ops/orders/sla",
        description: "Late order reviews, SLA breaches, and exception tracking.",
      },
    ],
  },
  {
    key: "production",
    label: "Production",
    items: [
      {
        label: "Recipes & BOM",
        href: "/ops/production/recipes",
        description: "Recipe standards, BOM versions, and yield benchmarks.",
      },
      {
        label: "Batch Planning",
        href: "/ops/production/batches",
        description: "Forecast-driven batch sizing and material readiness.",
      },
      {
        label: "Work Orders",
        href: "/ops/production/work-orders",
        description: "Production tasks, staffing, and station assignments.",
      },
      {
        label: "Yield & Wastage",
        href: "/ops/production/yield-waste",
        description: "Yield variance, shrinkage, and wastage reasons.",
      },
      {
        label: "Quality Checks (QC)",
        href: "/ops/production/qc",
        description: "Quality assurance checkpoints and compliance logs.",
      },
      {
        label: "Production Calendar",
        href: "/ops/production/calendar",
        description: "Bake calendar, shift planning, and capacity overview.",
      },
    ],
  },
  {
    key: "inventory",
    label: "Inventory",
    items: [
      {
        label: "Stock Overview",
        href: "/ops/inventory/stock",
        description: "On-hand stock, valuation, and coverage overview.",
      },
      {
        label: "Stock Ledger (Movements)",
        href: "/ops/inventory/ledger",
        description: "Inventory movement ledger and adjustment history.",
      },
      {
        label: "Batch / Expiry Tracking",
        href: "/ops/inventory/batches",
        description: "Lot tracking, expiries, and traceability controls.",
      },
      {
        label: "Adjustments (Damage/Expiry)",
        href: "/ops/inventory/adjustments",
        description: "Damage, expiry write-offs, and audit adjustments.",
      },
      {
        label: "Transfers (Warehouse/Branch)",
        href: "/ops/inventory/transfers",
        description: "Inter-branch transfers and warehouse dispatches.",
      },
      {
        label: "Low Stock & Expiry Alerts",
        href: "/ops/inventory/alerts",
        description: "Reorder triggers, expiry risks, and alert tuning.",
      },
    ],
  },
  {
    key: "procurement",
    label: "Procurement",
    items: [
      {
        label: "Vendors",
        href: "/ops/procurement/vendors",
        description: "Vendor profiles, SLAs, and performance history.",
      },
      {
        label: "Purchase Requests",
        href: "/ops/procurement/requests",
        description: "Internal request intake and approvals.",
      },
      {
        label: "Purchase Orders (PO)",
        href: "/ops/procurement/purchase-orders",
        description: "Purchase order creation, approvals, and tracking.",
      },
      {
        label: "GRN (Goods Received Note)",
        href: "/ops/procurement/grn",
        description: "Receiving entries, inspections, and quantity variance.",
      },
      {
        label: "Vendor Bills",
        href: "/ops/procurement/bills",
        description: "Vendor invoices, match status, and disputes.",
      },
      {
        label: "Vendor Payments",
        href: "/ops/procurement/payments",
        description: "Payment batches, due dates, and remittance status.",
      },
    ],
  },
  {
    key: "logistics",
    label: "Logistics",
    items: [
      {
        label: "Delivery Queue",
        href: "/ops/logistics/queue",
        description: "Dispatch queue, pickup prioritization, and readiness.",
      },
      {
        label: "Driver / Fleet",
        href: "/ops/logistics/fleet",
        description: "Fleet roster, driver performance, and compliance.",
      },
      {
        label: "Route Planning",
        href: "/ops/logistics/routes",
        description: "Route optimization, clustering, and ETA planning.",
      },
      {
        label: "Zones & Charges",
        href: "/ops/logistics/zones",
        description: "Delivery zones, surcharges, and coverage rules.",
      },
      {
        label: "SLA (On-time/Late)",
        href: "/ops/logistics/sla",
        description: "On-time performance and late delivery analysis.",
      },
      {
        label: "Delivery Events / Tracking",
        href: "/ops/logistics/tracking",
        description: "Real-time tracking events and issue resolution.",
      },
    ],
  },
  {
    key: "finance",
    label: "Finance",
    items: [
      {
        label: "Invoices",
        href: "/ops/finance/invoices",
        description: "Customer invoices, statuses, and reconciliation.",
      },
      {
        label: "Payments (COD/UPI/Card)",
        href: "/ops/finance/payments",
        description: "Payment collection, settlement, and exceptions.",
      },
      {
        label: "Refunds",
        href: "/ops/finance/refunds",
        description: "Refund approvals, aging, and payout tracking.",
      },
      {
        label: "Taxes / GST",
        href: "/ops/finance/taxes",
        description: "Tax reporting, GST filings, and compliance.",
      },
      {
        label: "Costing & Margin",
        href: "/ops/finance/costing",
        description: "Recipe costing, margins, and variance analysis.",
      },
      {
        label: "P&L Summary",
        href: "/ops/finance/pl",
        description: "Profit and loss summary with drill-down insights.",
      },
    ],
  },
  {
    key: "staff",
    label: "Staff & Payroll",
    items: [
      {
        label: "Employees",
        href: "/ops/erp/staff/employees",
        description: "Employee master records and onboarding status.",
      },
      {
        label: "Roles & Permissions",
        href: "/ops/erp/staff/roles",
        description: "Role-based access and shift permissions.",
      },
      {
        label: "Attendance",
        href: "/ops/erp/staff/attendance",
        description: "Attendance tracking, punch data, and exceptions.",
      },
      {
        label: "Shifts & Roster",
        href: "/ops/erp/staff/shifts",
        description: "Shift planning, roster coverage, and compliance.",
      },
      {
        label: "Payroll Runs",
        href: "/ops/erp/staff/payroll",
        description: "Payroll processing cycles and approvals.",
      },
      {
        label: "Payslips",
        href: "/ops/erp/staff/payslips",
        description: "Payslip distribution and audit history.",
      },
    ],
  },
];

export const opsCrmSubnav: OpsSubNavGroup[] = [
  {
    key: "customer-360",
    label: "Customer 360",
    items: [
      {
        label: "Customer List",
        href: "/ops/crm/customers",
        description: "Master customer roster and identifiers.",
      },
      {
        label: "Customer Profile",
        href: "/ops/crm/customers/[id]",
        description: "Profile view with contact and behavior timeline.",
      },
      {
        label: "Order History",
        href: "/ops/crm/customers/[id]/orders",
        description: "Customer-level order history and spend details.",
      },
      {
        label: "Spend & Frequency",
        href: "/ops/crm/customers/[id]/spend",
        description: "Spend, recency, and visit frequency insights.",
      },
      {
        label: "Loyalty Ledger",
        href: "/ops/crm/customers/[id]/loyalty",
        description: "Points activity, accruals, and redemptions.",
      },
      {
        label: "Notes & Tags",
        href: "/ops/crm/customers/[id]/notes",
        description: "Customer notes, tags, and service context.",
      },
    ],
  },
  {
    key: "segmentation",
    label: "Segmentation",
    items: [
      {
        label: "Lifecycle (New/Active/At-risk)",
        href: "/ops/crm/segments/lifecycle",
        description: "Lifecycle state distribution and actions.",
      },
      {
        label: "RFM Segments",
        href: "/ops/crm/segments/rfm",
        description: "Recency, frequency, and monetary cohorts.",
      },
      {
        label: "Tier Distribution",
        href: "/ops/crm/segments/tiers",
        description: "Membership tiers and migration trends.",
      },
      {
        label: "Saved Segments",
        href: "/ops/crm/segments/saved",
        description: "Reusable segments for targeting and exports.",
      },
    ],
  },
  {
    key: "engagement",
    label: "Engagement",
    items: [
      {
        label: "Offers / Coupons",
        href: "/ops/crm/engagement/offers",
        description: "Coupon library, redemptions, and rules.",
      },
      {
        label: "Campaigns",
        href: "/ops/crm/engagement/campaigns",
        description: "Campaign setup, schedule, and targeting.",
      },
      {
        label: "Automation Rules",
        href: "/ops/crm/engagement/automation",
        description: "Lifecycle automation and trigger rules.",
      },
      {
        label: "Campaign Performance",
        href: "/ops/crm/engagement/performance",
        description: "Engagement effectiveness and ROI metrics.",
      },
    ],
  },
  {
    key: "insights",
    label: "Insights",
    items: [
      {
        label: "CLV & Cohorts",
        href: "/ops/crm/insights/clv",
        description: "Lifetime value and cohort behavior insights.",
      },
      {
        label: "Churn Risk",
        href: "/ops/crm/insights/churn",
        description: "Churn propensity and retention risk alerts.",
      },
      {
        label: "Product Affinity",
        href: "/ops/crm/insights/affinity",
        description: "Product affinity clustering and cross-sell cues.",
      },
      {
        label: "Redemption Analysis",
        href: "/ops/crm/insights/redemption",
        description: "Reward redemption and breakage insights.",
      },
      {
        label: "Item Mood (Behavior Tags)",
        href: "/ops/crm/insights/item-mood",
        description: "Behavior tags and sentiment-driven patterns.",
      },
      {
        label: "Recommendations",
        href: "/ops/crm/insights/recommendations",
        description: "Next-best offer and product recommendations.",
      },
    ],
  },
  {
    key: "loyalty",
    label: "Loyalty & Membership",
    items: [
      {
        label: "Loyalty Dashboard",
        href: "/ops/loyalty",
        description: "Program health, point liability, and activity.",
      },
      {
        label: "Points Ledger",
        href: "/ops/loyalty/ledger",
        description: "Points transactions and adjustments ledger.",
      },
      {
        label: "Rules Engine",
        href: "/ops/loyalty/rules",
        description: "Reward earning and redemption rule configuration.",
      },
      {
        label: "Points Expiry",
        href: "/ops/loyalty/expiry",
        description: "Point expiry schedules and notifications.",
      },
      {
        label: "Redemptions",
        href: "/ops/loyalty/redemptions",
        description: "Redemption approvals and liability tracking.",
      },
      {
        label: "Membership Tiers",
        href: "/ops/loyalty/tiers",
        description: "Tier benefits, thresholds, and migrations.",
      },
    ],
  },
];

const flattenRoutes = (routes: OpsRouteMeta[]) => {
  const seen = new Set<string>();
  return routes.filter((route) => {
    if (seen.has(route.href)) return false;
    seen.add(route.href);
    return true;
  });
};

const subnavRoutes = [
  ...opsErpSubnav.flatMap((group) => group.items),
  ...opsCrmSubnav.flatMap((group) => group.items),
];

export const opsRouteMeta: OpsRouteMeta[] = flattenRoutes([
  ...opsTopNav.map((item) => ({
    href: item.href,
    label: item.label,
    description: item.description,
  })),
  ...subnavRoutes.map((item) => ({
    href: item.href,
    label: item.label,
    description: item.description,
  })),
]);

const toRouteRegex = (href: string) => {
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = escaped.replace(/\\\[[^/]+?\\\]/g, "[^/]+");
  return new RegExp(`^${pattern}$`);
};

export const findOpsRouteMeta = (pathname: string) => {
  const matches = opsRouteMeta
    .map((route) => ({
      route,
      match: toRouteRegex(route.href).test(pathname),
    }))
    .filter((entry) => entry.match)
    .map((entry) => entry.route);

  if (matches.length === 0) return null;
  return matches.sort((a, b) => b.href.length - a.href.length)[0];
};

export const getOpsBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; href: string }[] = [];

  segments.forEach((_, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    if (!href.startsWith("/ops")) return;
    const meta = findOpsRouteMeta(href);
    if (meta) {
      const exists = breadcrumbs.some((crumb) => crumb.label === meta.label);
      if (!exists) {
        breadcrumbs.push({ label: meta.label, href });
      }
    } else {
      const raw = segments[index];
      const label = raw
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      const exists = breadcrumbs.some((crumb) => crumb.label === label);
      if (!exists) {
        breadcrumbs.push({ label, href });
      }
    }
  });

  return breadcrumbs.length > 0 ? breadcrumbs : [{ label: "Ops", href: "/ops" }];
};

const erpPrefixes = [
  "/ops/orders",
  "/ops/production",
  "/ops/inventory",
  "/ops/procurement",
  "/ops/logistics",
  "/ops/finance",
  "/ops/erp/staff",
];

const crmPrefixes = ["/ops/crm", "/ops/loyalty"];

export const getOpsContext = (pathname: string) => {
  if (erpPrefixes.some((prefix) => pathname.startsWith(prefix))) return "erp";
  if (crmPrefixes.some((prefix) => pathname.startsWith(prefix))) return "crm";
  return null;
};

export const getOpsTitle = (pathname: string) =>
  findOpsRouteMeta(pathname)?.label ?? "Operations Console";

export const getOpsDescription = (pathname: string) =>
  findOpsRouteMeta(pathname)?.description ??
  "Unified operations visibility across Bake-Ree ERP and CRM workflows.";

export const opsHighlights = [
  {
    label: "Current Facility",
    value: "Main Bakehouse",
    icon: ShoppingCart,
  },
  {
    label: "Team On Duty",
    value: "42 staff",
    icon: Users,
  },
  {
    label: "Open Tasks",
    value: "18 tasks",
    icon: BarChart3,
  },
];
