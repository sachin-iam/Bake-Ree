import http from "@/services/http";
import type {
  GRN,
  PurchaseOrder,
  PurchaseRequest,
  Vendor,
  VendorBill,
  VendorItemPrice,
  VendorPayment,
} from "@/types/procurement";

export const procurementService = {
  async listVendors(): Promise<Vendor[]> {
    const { data } = await http.get("/procurement/vendors");
    return data;
  },
  async createVendor(payload: Partial<Vendor>): Promise<Vendor> {
    const { data } = await http.post("/procurement/vendors", payload);
    return data;
  },
  async listVendorItems(): Promise<VendorItemPrice[]> {
    const { data } = await http.get("/procurement/items");
    return data;
  },
  async listRequests(): Promise<PurchaseRequest[]> {
    const { data } = await http.get("/procurement/requests");
    return data;
  },
  async createRequest(payload: Partial<PurchaseRequest>): Promise<PurchaseRequest> {
    const { data } = await http.post("/procurement/requests", payload);
    return data;
  },
  async listPOs(): Promise<PurchaseOrder[]> {
    const { data } = await http.get("/procurement/pos");
    return data;
  },
  async createPO(payload: Partial<PurchaseOrder>): Promise<PurchaseOrder> {
    const { data } = await http.post("/procurement/pos", payload);
    return data;
  },
  async listGRNs(): Promise<GRN[]> {
    const { data } = await http.get("/procurement/grn");
    return data;
  },
  async createGRN(payload: Partial<GRN>): Promise<GRN> {
    const { data } = await http.post("/procurement/grn", payload);
    return data;
  },
  async listBills(): Promise<VendorBill[]> {
    const { data } = await http.get("/procurement/bills");
    return data;
  },
  async createBill(payload: Partial<VendorBill>): Promise<VendorBill> {
    const { data } = await http.post("/procurement/bills", payload);
    return data;
  },
  async listPayments(): Promise<VendorPayment[]> {
    const { data } = await http.get("/procurement/payments");
    return data;
  },
  async createPayment(payload: Partial<VendorPayment>): Promise<VendorPayment> {
    const { data } = await http.post("/procurement/payments", payload);
    return data;
  },
  async listReturns() {
    const { data } = await http.get("/procurement/returns");
    return data;
  },
  async createReturn(payload: {
    vendorId: string;
    warehouseId: string;
    items: { itemId: string; batchId?: string; qty: number }[];
    linkedPoId?: string;
  }) {
    const { data } = await http.post("/procurement/returns", payload);
    return data;
  },
};
