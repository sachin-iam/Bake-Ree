import type { DispatchRequest } from "@/store/kitchenStore";

const mockLatency = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const dispatchRequestsService = {
  async list(): Promise<DispatchRequest[]> {
    await mockLatency();
    return [];
  },
  async create(request: DispatchRequest): Promise<DispatchRequest> {
    await mockLatency();
    return request;
  },
  async update(requestId: string, patch: Partial<DispatchRequest>): Promise<{ id: string; patch: Partial<DispatchRequest> }> {
    await mockLatency();
    return { id: requestId, patch };
  },
};
