import http from "@/services/http";
import type {
  InventoryItem,
  StockBatch,
  StockLedgerEntry,
  StockReservation,
  Warehouse,
} from "@/types/inventory";

export const inventoryService = {
  async listItems(): Promise<InventoryItem[]> {
    const { data } = await http.get("/inventory/items");
    return data;
  },
  async createItem(payload: Partial<InventoryItem>): Promise<InventoryItem> {
    const { data } = await http.post("/inventory/items", payload);
    return data;
  },
  async listWarehouses(): Promise<Warehouse[]> {
    const { data } = await http.get("/inventory/warehouses");
    return data;
  },
  async createWarehouse(payload: Partial<Warehouse>): Promise<Warehouse> {
    const { data } = await http.post("/inventory/warehouses", payload);
    return data;
  },
  async listBins(params?: { warehouseId?: string }) {
    const { data } = await http.get("/inventory/bins", { params });
    return data;
  },
  async createBin(payload: { warehouseId: string; code: string; tempZone?: string }) {
    const { data } = await http.post("/inventory/bins", payload);
    return data;
  },
  async listBatches(params?: { itemId?: string; warehouseId?: string }): Promise<StockBatch[]> {
    const { data } = await http.get("/inventory/batches", { params });
    return data;
  },
  async listLedger(params?: Record<string, string>): Promise<StockLedgerEntry[]> {
    const { data } = await http.get("/inventory/ledger", { params });
    return data;
  },
  async createReservation(
    payload: Pick<StockReservation, "itemId" | "warehouseId" | "qty"> & {
      orderId?: string;
      workOrderId?: string;
    }
  ): Promise<StockReservation> {
    const { data } = await http.post("/inventory/reservations", payload);
    return data;
  },
  async consumeReservation(reservationId: string): Promise<StockReservation> {
    const { data } = await http.post(`/inventory/reservations/${reservationId}/consume`);
    return data;
  },
  async releaseReservation(reservationId: string): Promise<StockReservation> {
    const { data } = await http.post(`/inventory/reservations/${reservationId}/release`);
    return data;
  },
  async createAdjustment(payload: {
    warehouseId: string;
    items: { itemId: string; batchId?: string; qtyDelta: number; reason: string }[];
    approvedBy?: string;
  }) {
    const { data } = await http.post("/inventory/adjustments", payload);
    return data;
  },
  async createTransfer(payload: {
    fromWarehouseId: string;
    toWarehouseId: string;
    items: { itemId: string; batchId?: string; qty: number }[];
  }) {
    const { data } = await http.post("/inventory/transfers", payload);
    return data;
  },
  async receiveTransfer(transferId: string) {
    const { data } = await http.post(`/inventory/transfers/${transferId}/receive`);
    return data;
  },
  async logWaste(payload: {
    warehouseId: string;
    items: { itemId: string; batchId?: string; qty: number; reason: string }[];
  }) {
    const { data } = await http.post("/inventory/waste", payload);
    return data;
  },
  async createReturn(payload: {
    vendorId?: string;
    warehouseId: string;
    items: { itemId: string; batchId?: string; qty: number }[];
    linkedPoId?: string;
  }) {
    const { data } = await http.post("/inventory/returns", payload);
    return data;
  },
  async postProduction(payload: {
    workOrderId: string;
    warehouseId: string;
    inputs: { itemId: string; batchIds?: string[]; qty: number }[];
    outputs: {
      itemId: string;
      batch: { lotNumber: string; mfgDate?: string; expDate?: string };
      qty: number;
    }[];
  }) {
    const { data } = await http.post("/inventory/production", payload);
    return data;
  },
};
