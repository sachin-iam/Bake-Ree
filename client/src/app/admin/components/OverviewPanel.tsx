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
import { Pie, Bar, Line } from "react-chartjs-2";
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

const statusStyles: Record<string, string> = {
  Pending:
    "bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 animate-pulse shadow-md",
  Preparing:
    "bg-gradient-to-r from-orange-300 to-orange-500 text-orange-900 animate-pulse shadow-md",
  Ready:
    "bg-gradient-to-r from-green-300 to-green-500 text-green-900 animate-pulse shadow-md",
  Delivered:
    "bg-gradient-to-r from-blue-300 to-blue-500 text-blue-900 shadow-md",
  Cancelled: "bg-gradient-to-r from-red-300 to-red-500 text-red-900 shadow-md",
};

const OverviewPanel = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);

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

        const [analyticsRes, ordersRes, weeklyRes] = await Promise.all([
          fetch("http://localhost:5000/api/analytics/admin/overview", {
            headers,
          }),
          fetch("http://localhost:5000/api/orders/recent", {
            headers,
          }),
          fetch("http://localhost:5000/api/analytics/weekly", {
            headers,
          }),
        ]);

        if (!analyticsRes.ok || !ordersRes.ok || !weeklyRes.ok) {
          console.error(
            "API call failed",
            await analyticsRes.text(),
            await ordersRes.text(),
            await weeklyRes.text()
          );
          return;
        }

        const analyticsData = await analyticsRes.json();
        const ordersData = await ordersRes.json();
        const weeklyData = await weeklyRes.json();

        setAnalytics(analyticsData);
        setRecentOrders(ordersData);
        setWeeklyStats(weeklyData);
      } catch (err) {
        console.error("Error fetching analytics, orders or weekly stats:", err);
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

  const totalWeeklyRevenue = (stats: any[]) =>
    stats.reduce((sum, s) => sum + s.totalRevenue, 0);

  const totalWeeklyOrders = (stats: any[]) =>
    stats.reduce((sum, s) => sum + s.orderCount, 0);

  const averageOrderValue = (stats: any[]) => {
    const totalRevenue = totalWeeklyRevenue(stats);
    const totalOrders = totalWeeklyOrders(stats);
    return totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0";
  };

  const getTopDay = (stats: any[]) => {
    if (stats.length === 0) return "N/A";
    const top = [...stats].sort((a, b) => b.totalRevenue - a.totalRevenue)[0];
    return new Date(top._id).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

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
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#374151",
                      padding: 12,
                      boxWidth: 14,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.parsed;
                        return `${label}: ${value} orders`;
                      },
                    },
                  },
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
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `₹${context.parsed.y}`;
                      },
                    },
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                      color: "#4b5563",
                      padding: 10,
                      boxWidth: 12,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Left: Weekly Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">
            Weekly Revenue & Orders
          </h3>
          <div className="h-[300px] w-full">
            <Bar
              data={{
                labels: weeklyStats.map((s) => s._id),
                datasets: [
                  {
                    label: "Revenue (₹)",
                    data: weeklyStats.map((s) => s.totalRevenue),
                    backgroundColor: "#c084fc",
                    yAxisID: "y",
                  },
                  {
                    label: "Orders",
                    data: weeklyStats.map((s) => s.orderCount),
                    backgroundColor: "#60a5fa",
                    yAxisID: "y1",
                  },
                ],
              }}
              options={{
                responsive: true,
                interaction: {
                  mode: "index" as const,
                  intersect: false,
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label;
                        const value = context.parsed.y;
                        return label === "Orders"
                          ? `${value} orders`
                          : `₹${value}`;
                      },
                    },
                  },
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#4b5563",
                      padding: 10,
                      boxWidth: 12,
                    },
                  },
                },
                scales: {
                  y: {
                    type: "linear",
                    position: "left",
                    ticks: {
                      callback: (val) => `₹${val}`,
                      color: "#4b5563",
                    },
                  },
                  y1: {
                    type: "linear",
                    position: "right",
                    grid: { drawOnChartArea: false },
                    ticks: {
                      color: "#4b5563",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Right: Weekly Stats Styled Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md mt-8">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">
            Weekly Highlights
          </h3>

          <div className="space-y-3">
            {[
              {
                icon: "🏆",
                label: "Top Day",
                value: getTopDay(weeklyStats),
              },
              {
                icon: "💰",
                label: "Total Revenue",
                value: `₹${totalWeeklyRevenue(weeklyStats)}`,
              },
              {
                icon: "📦",
                label: "Total Orders",
                value: totalWeeklyOrders(weeklyStats),
              },
              {
                icon: "📊",
                label: "Avg. Order Value",
                value: `₹${averageOrderValue(weeklyStats)}`,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg"
              >
                <div className="flex items-center space-x-3 text-[#2a2927]">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="font-semibold text-[#2a2927]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-md mt-8">
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
                  {order.user?.name || "Guest"}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                  statusStyles[order.status] || "bg-gray-200 text-gray-700"
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
