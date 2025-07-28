"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const OverviewPanel = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) return;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [analyticsRes, ordersRes] = await Promise.all([
          fetch("http://localhost:5000/api/analytics/admin/overview", {
            headers,
          }),
          fetch("http://localhost:5000/api/orders/recent", { headers }),
        ]);

        if (!analyticsRes.ok || !ordersRes.ok) {
          console.error(
            "API call failed",
            await analyticsRes.text(),
            await ordersRes.text()
          );
          return;
        }

        const analyticsData = await analyticsRes.json();
        const ordersData = await ordersRes.json();

        setAnalytics(analyticsData);
        setRecentOrders(ordersData);
      } catch (err) {
        console.error("Error fetching analytics or orders:", err);
      }
    };

    fetchData();
  }, []);

  if (!analytics) {
    return (
      <div className="text-center p-10 text-[#2a2927]">
        Loading analytics...
      </div>
    );
  }

  const statusCounts = Object.fromEntries(
    analytics.ordersByStatus.map((item: any) => [item._id, item.count])
  );

  const orderTypeRevenue = Object.fromEntries(
    analytics.revenueByOrderType.map((item: any) => [item._id, item.revenue])
  );

  return (
    <section className="text-[#2a2927]">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card
          title="Total Orders"
          value={analytics.totalOrders.toString()}
          trend="+12%"
        />
        <Card
          title="Total Revenue"
          value={`₹${analytics.totalRevenue}`}
          trend="+8%"
        />
        <Card
          title="Total Customers"
          value={analytics.totalCustomers.toString()}
          trend="+5%"
        />
        <Card
          title="Total Products"
          value={analytics.totalProducts.toString()}
          trend="+2%"
        />
      </div>

      {/* Chart Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">
            Orders by Status
          </h3>
          <div className="max-w-[300px] h-[300px] mx-auto">
            <Pie
              data={{
                labels: Object.keys(statusCounts),
                datasets: [
                  {
                    data: Object.values(statusCounts),
                    backgroundColor: [
                      "#facc15", // yellow
                      "#fb923c", // orange
                      "#4ade80", // green
                      "#60a5fa", // blue
                      "#f87171", // red
                    ],
                    borderColor: "#fff",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">
            Revenue by Order Type
          </h3>
          <div className="max-w-[300px] h-[300px] mx-auto">
            <Bar
              data={{
                labels: Object.keys(orderTypeRevenue),
                datasets: [
                  {
                    label: "Revenue (₹)",
                    data: Object.values(orderTypeRevenue),
                    backgroundColor: ["#a78bfa", "#f472b6"],
                    borderRadius: 6,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (val) => `₹${val}`,
                      color: "#4b5563",
                    },
                  },
                  x: {
                    ticks: {
                      color: "#4b5563",
                    },
                  },
                },
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-[#2a2927] mb-1">
          Recent Orders
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Latest orders from your bakery
        </p>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg"
            >
              <div>
                <p className="font-semibold text-[#2a2927]">
                  ORD-{order._id?.slice(-4).toUpperCase()}
                </p>
                <p className="text-sm text-gray-500">
                  {order.customerName || "Unknown"}
                </p>
              </div>

              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "preparing"
                    ? "bg-orange-100 text-orange-700"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.status}
              </span>

              <div className="text-right">
                <p className="text-[#2a2927] font-semibold">
                  ₹{order.totalAmount}
                </p>
                <p className="text-xs text-gray-400">
                  {typeof window !== "undefined"
                    ? format(order.createdAt)
                    : "just now"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({
  title,
  value,
  trend,
}: {
  title: string;
  value: string;
  trend: string;
}) => (
  <div className="bg-white p-5 rounded-2xl shadow-md">
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-3xl font-bold mt-1 text-[#2a2927]">{value}</p>
    <p className="text-xs text-green-600 mt-1">{trend} from last month</p>
  </div>
);

export default OverviewPanel;
