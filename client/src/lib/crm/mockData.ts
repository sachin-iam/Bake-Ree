export const crmKpis = [
  { label: "Total Customers", value: "24,860", delta: "+3.4%" },
  { label: "Active Customers", value: "9,412", delta: "+1.2%" },
  { label: "New Today", value: "86", delta: "+12%" },
  { label: "Repeat Rate", value: "43%", delta: "+2.8%" },
  { label: "Revenue Today", value: "$18.4k", delta: "+5.1%" },
  { label: "AOV Today", value: "$24.60", delta: "+1.0%" },
  { label: "Outstanding Total", value: "$42.2k", delta: "-0.6%" },
  { label: "Points Liability", value: "$9.8k", delta: "+0.4%" },
];

export const revenueTrend = [
  { day: "Mon", revenue: 14.2, orders: 320 },
  { day: "Tue", revenue: 16.1, orders: 351 },
  { day: "Wed", revenue: 18.4, orders: 382 },
  { day: "Thu", revenue: 15.9, orders: 344 },
  { day: "Fri", revenue: 20.3, orders: 410 },
  { day: "Sat", revenue: 23.6, orders: 452 },
  { day: "Sun", revenue: 19.8, orders: 391 },
];

export const newVsReturning = [
  { day: "Mon", new: 120, returning: 200 },
  { day: "Tue", new: 135, returning: 216 },
  { day: "Wed", new: 142, returning: 240 },
  { day: "Thu", new: 118, returning: 226 },
  { day: "Fri", new: 150, returning: 260 },
  { day: "Sat", new: 170, returning: 282 },
  { day: "Sun", new: 146, returning: 245 },
];

export const outstandingAging = [
  { bucket: "0-7d", value: 12 },
  { bucket: "8-14d", value: 9 },
  { bucket: "15-30d", value: 14 },
  { bucket: "31-60d", value: 5 },
  { bucket: "60+d", value: 2 },
];

export const tierDistribution = [
  { name: "Bronze", value: 46 },
  { name: "Silver", value: 28 },
  { name: "Gold", value: 18 },
  { name: "Platinum", value: 8 },
];

export const topCustomers = [
  {
    name: "Naina Kapoor",
    clv: "$4,820",
    orders: "38",
    churn: "Low",
  },
  {
    name: "Rohit Das",
    clv: "$4,110",
    orders: "31",
    churn: "Medium",
  },
  {
    name: "Aisha Khan",
    clv: "$3,760",
    orders: "29",
    churn: "Low",
  },
];

export const atRiskCustomers = [
  { name: "Leena Bose", lastOrder: "31d", churn: "High", owner: "Priya" },
  { name: "Samir Rao", lastOrder: "28d", churn: "High", owner: "Rahul" },
  { name: "Esha Jain", lastOrder: "24d", churn: "Medium", owner: "Priya" },
];

export const highOutstanding = [
  { name: "Sunita Patel", outstanding: "$420", aging: "31-60d" },
  { name: "Dev Menon", outstanding: "$360", aging: "15-30d" },
  { name: "Neeraj Kulkarni", outstanding: "$315", aging: "8-14d" },
];

export const areaInsights = [
  { area: "Central", revenue: 48, orders: 620, mix: 42 },
  { area: "North", revenue: 36, orders: 480, mix: 33 },
  { area: "South", revenue: 28, orders: 410, mix: 25 },
];

export const customerList = [
  {
    name: "Naina Kapoor",
    area: "Central",
    tier: "Gold",
    points: "2,840",
    lastOrder: "2d",
    orders30d: "6",
    spend30d: "$320",
    clv: "$4,820",
    churn: "Low",
    outstanding: "$0",
  },
  {
    name: "Rohit Das",
    area: "North",
    tier: "Silver",
    points: "1,420",
    lastOrder: "5d",
    orders30d: "4",
    spend30d: "$210",
    clv: "$4,110",
    churn: "Medium",
    outstanding: "$60",
  },
  {
    name: "Aisha Khan",
    area: "South",
    tier: "Platinum",
    points: "4,980",
    lastOrder: "1d",
    orders30d: "8",
    spend30d: "$610",
    clv: "$3,760",
    churn: "Low",
    outstanding: "$0",
  },
];

export const customerRecommendations = [
  {
    product: "Salted caramel cake",
    reason: "Wishlist item + celebration pattern detected",
    confidence: "0.82",
  },
  {
    product: "Coffee + almond croissant bundle",
    reason: "Frequent coffee orders with morning delivery",
    confidence: "0.74",
  },
  {
    product: "Tier upgrade push",
    reason: "Spend $48 to reach Platinum in 90-day window",
    confidence: "0.68",
  },
];

export const pointsLedger = [
  { date: "Jan 18", type: "Earn", points: "+240", balance: "2,840", ref: "ORD-9921" },
  { date: "Jan 12", type: "Redeem", points: "-120", balance: "2,600", ref: "ORD-9880" },
  { date: "Jan 05", type: "Earn", points: "+180", balance: "2,720", ref: "ORD-9822" },
];

export const timelineEvents = [
  { time: "Jan 18", note: "Order delivered (Cake + pastries)." },
  { time: "Jan 12", note: "Redeemed 120 points for free delivery." },
  { time: "Jan 05", note: "Support ticket: Address update." },
];

export const walletLedger = [
  { date: "Jan 19", type: "Credit", amount: "$40", reason: "Refund", ref: "ORD-9921" },
  { date: "Jan 07", type: "Debit", amount: "$18", reason: "Applied credit", ref: "ORD-9822" },
];

export const commsHistory = [
  { date: "Jan 15", channel: "WhatsApp", campaign: "Weekend Treats", status: "Opened" },
  { date: "Jan 03", channel: "Email", campaign: "Tier Upgrade", status: "Clicked" },
];
