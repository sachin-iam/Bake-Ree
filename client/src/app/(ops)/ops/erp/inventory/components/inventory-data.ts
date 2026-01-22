export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  category: string;
  location: string;
  batch: string;
  expiry: string;
  onHand: number;
  available: number;
  reserved: number;
  status: "healthy" | "low" | "critical" | "expired";
};

export const inventorySeed: InventoryItem[] = [
  {
    id: "inv-1",
    name: "Classic Sourdough Loaf",
    sku: "BRD-SDL-001",
    category: "Breads",
    location: "Central Kitchen",
    batch: "B-2026-01-21",
    expiry: "2026-01-25",
    onHand: 120,
    available: 98,
    reserved: 22,
    status: "healthy",
  },
  {
    id: "inv-2",
    name: "Chocolate Chip Cookies",
    sku: "CKY-CHC-014",
    category: "Cookies",
    location: "Downtown Store",
    batch: "B-2026-01-20",
    expiry: "2026-01-24",
    onHand: 60,
    available: 42,
    reserved: 18,
    status: "low",
  },
  {
    id: "inv-3",
    name: "Blueberry Muffin",
    sku: "MUF-BLU-008",
    category: "Pastries",
    location: "Central Kitchen",
    batch: "B-2026-01-19",
    expiry: "2026-01-22",
    onHand: 28,
    available: 18,
    reserved: 10,
    status: "critical",
  },
  {
    id: "inv-4",
    name: "Almond Biscotti",
    sku: "BSC-ALM-003",
    category: "Others",
    location: "Warehouse",
    batch: "B-2025-12-30",
    expiry: "2026-02-15",
    onHand: 220,
    available: 210,
    reserved: 10,
    status: "healthy",
  },
  {
    id: "inv-5",
    name: "Strawberry Celebration Cake",
    sku: "CKE-STR-011",
    category: "Cakes",
    location: "Central Kitchen",
    batch: "B-2026-01-18",
    expiry: "2026-01-21",
    onHand: 8,
    available: 3,
    reserved: 5,
    status: "expired",
  },
];

export const statusLabels: Record<InventoryItem["status"], string> = {
  healthy: "Healthy",
  low: "Low",
  critical: "Critical",
  expired: "Expired",
};
