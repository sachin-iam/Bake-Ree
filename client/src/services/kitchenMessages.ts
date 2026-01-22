import type { KitchenMessage, OrderThreadMessage } from "@/store/kitchenStore";

const mockLatency = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const kitchenMessagesService = {
  async list(): Promise<KitchenMessage[]> {
    await mockLatency();
    return [];
  },
  async create(message: KitchenMessage): Promise<KitchenMessage> {
    await mockLatency();
    return message;
  },
  async createThreadMessage(orderId: string, message: OrderThreadMessage): Promise<{ orderId: string; message: OrderThreadMessage }> {
    await mockLatency();
    return { orderId, message };
  },
};
