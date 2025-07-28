"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { Pie, Bar } from "react-chartjs-2";
import { ChartData } from "@/types/chart";

const AnalyticsPage = () => {
  const [statusData, setStatusData] = useState<ChartData | null>(null);
  const [typeRevenue, setTypeRevenue] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [statusRes, typeRes] = await Promise.all([
          axios.get("/orders/status-distribution", config),
          axios.get("/orders/type-revenue", config),
        ]);

        const statusChart: ChartData = {
          labels: Object.keys(statusRes.data),
          datasets: [
            {
              label: "Orders by Status",
              data: Object.values(statusRes.data) as number[],
              backgroundColor: [
                "#36A2EB",
                "#FF6384",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        };

        const revenueChart: ChartData = {
          labels: Object.keys(typeRes.data),
          datasets: [
            {
              label: "Revenue by Order Type",
              data: Object.values(typeRes.data) as number[],
              backgroundColor: ["#6366f1", "#f43f5e"],
            },
          ],
        };

        setStatusData(statusChart);
        setTypeRevenue(revenueChart);
      } catch (error) {
        console.error("Analytics fetch failed:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Orders by Status</h2>
      {statusData ? <Pie data={statusData} /> : <p>No data available</p>}

      <h2 className="text-xl font-bold mt-10 mb-4">Revenue by Order Type</h2>
      {typeRevenue ? (
        <Bar data={typeRevenue} />
      ) : (
        <p>No revenue data available</p>
      )}
    </div>
  );
};

export default AnalyticsPage;
