export type Vendor = {
  id: string;
  name: string;
  contacts?: { name: string; email: string; phone?: string }[];
  leadTimeDays?: number;
  paymentTerms?: string;
  rating?: number;
  active: boolean;
};

export type VendorItemPrice = {
  id: string;
  vendorId: string;
  itemId: string;
  uom: string;
  price: number;
  minQty?: number;
  validFrom?: string;
  validTo?: string;
};

export type PurchaseRequest = {
  id: string;
  warehouseId: string;
  items: { itemId: string; qty: number; uom: string; reason?: string }[];
  status: "draft" | "pending" | "approved" | "rejected";
};

export type PurchaseOrder = {
  id: string;
  vendorId: string;
  warehouseId: string;
  lines: {
    itemId: string;
    qty: number;
    uom: string;
    price: number;
    tax?: number;
    expectedDate?: string;
  }[];
  status: "draft" | "approved" | "sent" | "partial" | "closed" | "cancelled";
};

export type GRN = {
  id: string;
  poId: string;
  vendorId: string;
  warehouseId: string;
  receivedLines: {
    itemId: string;
    batch: { lot: string; mfg?: string; exp?: string };
    qty: number;
    uom: string;
    unitCost: number;
  }[];
  qcStatus: "pending" | "passed" | "failed" | "partial";
};

export type VendorBill = {
  id: string;
  vendorId: string;
  poId?: string;
  grnId?: string;
  amount: number;
  tax?: number;
  status: "pending" | "approved" | "paid";
};

export type VendorPayment = {
  id: string;
  billId: string;
  method: string;
  amount: number;
  paidAt?: string;
  refNo?: string;
};
