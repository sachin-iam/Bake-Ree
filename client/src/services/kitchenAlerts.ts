import type { StockAlert } from "@/store/kitchenStore";

const mockLatency = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const kitchenAlertsService = {
  async list(): Promise<StockAlert[]> {
    await mockLatency();
    return [];
  },
  async create(alert: StockAlert): Promise<StockAlert> {
    await mockLatency();
    return alert;
  },
  async update(alertId: string, patch: Partial<StockAlert>): Promise<{ id: string; patch: Partial<StockAlert> }> {
    await mockLatency();
    return { id: alertId, patch };
  },
};
