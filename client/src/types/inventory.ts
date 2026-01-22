export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  type: "ingredient" | "packaging" | "finished_good";
  categoryId?: string;
  uomBase: string;
  reorderPoint?: number;
  reorderQty?: number;
  minStock?: number;
  maxStock?: number;
  shelfLifeDays?: number;
  storageTempZone?: string;
  allergens?: string[];
  costingMethod?: "FIFO" | "WAVG";
  active: boolean;
  createdAt: string;
};

export type Warehouse = {
  id: string;
  name: string;
  type: "central" | "store" | "kitchen";
  address?: string;
  zones?: string[];
  active: boolean;
};

export type StockBatch = {
  id: string;
  itemId: string;
  warehouseId: string;
  binId?: string;
  lotNumber: string;
  mfgDate?: string;
  expDate?: string;
  qtyOnHand: number;
  qtyReserved: number;
  unitCost: number;
  sourceRef?: string;
};

export type StockReservation = {
  id: string;
  itemId: string;
  warehouseId: string;
  orderId?: string;
  workOrderId?: string;
  qty: number;
  batchIdsAllocated: { batchId: string; qty: number }[];
  status: "reserved" | "released" | "consumed";
};

export type StockLedgerEntry = {
  id: string;
  ts: string;
  itemId: string;
  warehouseId: string;
  batchId?: string;
  type:
    | "IN"
    | "OUT"
    | "TRANSFER_IN"
    | "TRANSFER_OUT"
    | "ADJUST"
    | "WASTE"
    | "RETURN"
    | "ISSUE"
    | "PROD_OUT";
  qty: number;
  uom: string;
  unitCost: number;
  totalCost: number;
  refType:
    | "GRN"
    | "PO"
    | "ORDER"
    | "WORK_ORDER"
    | "ADJUSTMENT"
    | "TRANSFER"
    | "RTV"
    | "PRODUCTION";
  refId?: string;
  createdBy?: string;
  note?: string;
  beforeQty?: number;
  afterQty?: number;
  reasonCode?: string;
};
