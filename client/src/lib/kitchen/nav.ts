import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  CookingPot,
  LayoutList,
  MessageSquare,
  Settings,
  Siren,
} from "lucide-react";

export type KitchenNavItem = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export const kitchenNav: KitchenNavItem[] = [
  {
    key: "queue",
    label: "Queue",
    href: "/kitchen",
    icon: LayoutList,
    description: "Live queue of active kitchen orders.",
  },
  {
    key: "workstation",
    label: "Workstation",
    href: "/kitchen/workstation",
    icon: Activity,
    description: "Assigned orders, timers, and station actions.",
  },
  {
    key: "prep",
    label: "Prep & Batches",
    href: "/kitchen/prep",
    icon: CookingPot,
    description: "Batch plan, prep list, and QC progress.",
  },
  {
    key: "alerts",
    label: "Inventory Alerts",
    href: "/kitchen/alerts",
    icon: AlertTriangle,
    description: "Low stock alerts and replenishment requests.",
  },
  {
    key: "quality",
    label: "Quality & Waste",
    href: "/kitchen/quality",
    icon: Siren,
    description: "QC checks, waste logs, and compliance notes.",
  },
  {
    key: "messages",
    label: "Messages",
    href: "/kitchen/messages",
    icon: MessageSquare,
    description: "Kitchen pings and order threads.",
  },
  {
    key: "settings",
    label: "Settings",
    href: "/kitchen/settings",
    icon: Settings,
    description: "Shift defaults and station configuration.",
  },
];

export const kitchenMeta = {
  label: "Kitchen Console",
  description: "Real-time production control for Bake-Ree kitchen teams.",
};
