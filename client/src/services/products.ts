import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const ProductsAPI = {
  getAll: () => request<Product[]>("/api/products"),
  getFeatured: () => request<Product[]>("/api/products/featured"),
  deleteById: (id: string) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return request<{ message: string }>(`/api/products/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
};
