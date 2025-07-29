"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import OrdersTable from "./components/OrdersTable";
import OverviewPanel from "./components/OverviewPanel";
import CustomerTable from "./components/CustomerTable"; 

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([
    { name: "Artisan Sourdough", category: "Breads", price: 8.99, stock: 12 },
    { name: "French Croissants", category: "Pastries", price: 4.5, stock: 24 },
    { name: "Chocolate Éclair", category: "Pastries", price: 6.25, stock: 8 },
    { name: "Red Velvet Cake", category: "Cakes", price: 45.0, stock: 3 },
  ]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/admin?tab=${tab}`, { scroll: false });
  };

  const addProduct = (product: any) => {
    setProducts([...products, product]);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTable />;

      case "products":
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#72d3cb] hover:bg-[#5ab8b0] text-white px-4 py-2 rounded-md shadow-md"
              >
                + Add Product
              </button>
            </div>

            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold text-[#2a2927]">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#2a2927] font-semibold">${product.price}</p>
                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-sm px-3 py-1 rounded-md bg-[#f3f2ec] border border-[#d97706] text-[#d97706] hover:bg-[#faede5]">
                      Edit
                    </button>
                    <button className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "customers":
        return (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <CustomerTable />
          </div>
        );

      default:
      case "overview":
        return <OverviewPanel />;
    }
  };

  return (
    <section className="min-h-screen bg-[#f3f2ec] px-6 py-28">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2a2927] mb-8">Admin Dashboard</h1>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-start mb-8">
          {["overview", "orders", "products", "customers"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2 rounded-full mr-4 mb-2 font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#2a2927] text-white"
                  : "bg-white text-[#2a2927] border border-[#2a2927]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {renderTab()}
      </div>
    </section>
  );
}
