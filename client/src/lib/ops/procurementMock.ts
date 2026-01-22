export const procurementKpis = [
  { label: "Active Vendors", value: "64", hint: "Preferred: 18", tone: "neutral" },
  { label: "Open PRs", value: "22", hint: "7 awaiting approval", tone: "warning" },
  { label: "Open POs", value: "41", hint: "12 partial", tone: "neutral" },
  { label: "Bills Pending", value: "14", hint: "3 overdue", tone: "warning" },
  { label: "Fill Rate", value: "96.2%", hint: "Last 30 days", tone: "positive" },
];

export const vendorRows = [
  {
    id: "ven-01",
    name: "DairyFresh Co.",
    leadTime: "3 days",
    rating: "4.8",
    terms: "Net 15",
    status: "Active",
  },
  {
    id: "ven-02",
    name: "Bakers Supply",
    leadTime: "4 days",
    rating: "4.5",
    terms: "Net 30",
    status: "Active",
  },
];

export const vendorItemRows = [
  {
    id: "vitem-01",
    vendor: "DairyFresh Co.",
    item: "Milk 3.5%",
    uom: "L",
    price: "$1.90",
    valid: "Jan 1 - Mar 31",
  },
];

export const prRows = [
  {
    id: "pr-01",
    warehouse: "Central Bakehouse",
    lines: "8",
    status: "Pending",
    reason: "Low stock",
  },
  {
    id: "pr-02",
    warehouse: "West Hub",
    lines: "5",
    status: "Approved",
    reason: "Seasonal forecast",
  },
];

export const rfqRows = [
  {
    id: "rfq-01",
    vendorCount: "3",
    items: "6",
    status: "Open",
    due: "Jan 25, 2026",
  },
];

export const poRows = [
  {
    id: "po-4821",
    vendor: "DairyFresh Co.",
    amount: "$24,880",
    status: "Partial",
    expected: "Jan 23, 2026",
  },
  {
    id: "po-4825",
    vendor: "Bakers Supply",
    amount: "$12,420",
    status: "Approved",
    expected: "Jan 24, 2026",
  },
];

export const approvalRows = [
  {
    id: "appr-01",
    request: "PR-2391",
    step: "Finance",
    owner: "M. Iyer",
    status: "Pending",
  },
];

export const grnRows = [
  {
    id: "grn-4831",
    vendor: "DairyFresh Co.",
    po: "PO-4821",
    qc: "Passed",
    variance: "0.8%",
  },
];

export const threeWayMatchRows = [
  {
    id: "twm-01",
    po: "PO-4821",
    grn: "GRN-4831",
    bill: "INV-8821",
    status: "Matched",
  },
];

export const billRows = [
  {
    id: "bill-01",
    vendor: "DairyFresh Co.",
    amount: "$24,880",
    status: "Pending",
    due: "Feb 8, 2026",
  },
];

export const paymentRows = [
  {
    id: "pay-01",
    bill: "INV-8821",
    method: "ACH",
    amount: "$24,880",
    status: "Scheduled",
  },
];

export const purchaseReturnRows = [
  {
    id: "rtv-01",
    vendor: "DairyFresh Co.",
    items: "2",
    value: "$1,120",
    status: "Pending",
  },
];

export const analyticsRows = [
  {
    id: "ana-01",
    metric: "Avg Lead Time",
    value: "3.4 days",
    trend: "-0.2 days",
  },
  {
    id: "ana-02",
    metric: "Price Variance",
    value: "+1.2%",
    trend: "Stable",
  },
];
