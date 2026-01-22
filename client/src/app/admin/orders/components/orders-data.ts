export type AdminOrder = {
  id: string;
  customer: string;
  channel: "Online" | "In-Store" | "Phone";
  orderType: "Delivery" | "Pickup";
  status: "pending" | "preparing" | "ready" | "delivering" | "delivered" | "cancelled";
  payment: "Paid" | "COD" | "Refunded";
  total: number;
  placedAt: string;
  eta: string;
};

export const adminOrdersSeed: AdminOrder[] = [
  {
    id: "BR-10031",
    customer: "Aanya Sharma",
    channel: "Online",
    orderType: "Delivery",
    status: "preparing",
    payment: "Paid",
    total: 1299,
    placedAt: "2026-01-22 09:12",
    eta: "10:05",
  },
  {
    id: "BR-10032",
    customer: "Neel Mehta",
    channel: "Online",
    orderType: "Pickup",
    status: "ready",
    payment: "Paid",
    total: 749,
    placedAt: "2026-01-22 09:25",
    eta: "10:00",
  },
  {
    id: "BR-10033",
    customer: "Zara Patel",
    channel: "Phone",
    orderType: "Delivery",
    status: "delivering",
    payment: "COD",
    total: 499,
    placedAt: "2026-01-22 09:40",
    eta: "10:30",
  },
  {
    id: "BR-10034",
    customer: "Rahul Kapoor",
    channel: "In-Store",
    orderType: "Pickup",
    status: "delivered",
    payment: "Paid",
    total: 320,
    placedAt: "2026-01-22 08:55",
    eta: "09:15",
  },
  {
    id: "BR-10035",
    customer: "Tanya Roy",
    channel: "Online",
    orderType: "Delivery",
    status: "pending",
    payment: "Paid",
    total: 1899,
    placedAt: "2026-01-22 09:58",
    eta: "10:50",
  },
  {
    id: "BR-10036",
    customer: "Arjun Singh",
    channel: "Online",
    orderType: "Delivery",
    status: "cancelled",
    payment: "Refunded",
    total: 540,
    placedAt: "2026-01-22 09:05",
    eta: "09:45",
  },
];

export const statusLabels: Record<AdminOrder["status"], string> = {
  pending: "Pending",
  preparing: "Preparing",
  ready: "Ready",
  delivering: "Delivering",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
