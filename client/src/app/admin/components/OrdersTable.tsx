"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

interface Order {
  _id: string;
  user?: { name: string };
  total: number;
  status: string;
  orderType: string;
  createdAt: string;
}

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

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("Admin token missing");

      const res = await axios.get("http://localhost:5000/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (startDate && endDate) {
      filtered = filtered.filter((order) => {
        const created = new Date(order.createdAt).getTime();
        return created >= startDate.getTime() && created <= endDate.getTime();
      });
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((order) =>
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, startDate, endDate, statusFilter, searchTerm]);

  const markAsDelivered = async (orderId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: "Delivered" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("Failed to mark as delivered", err);
    }
  };

  const exportToCSV = () => {
    const data = filteredOrders.map((order) => ({
      Name: order.user?.name || "Guest",
      Total: order.total,
      Status: order.status,
      OrderType: order.orderType,
      CreatedAt: new Date(order.createdAt).toLocaleString(),
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["Name", "Total", "Status", "OrderType", "CreatedAt"],
        ...data.map((row) => Object.values(row)),
      ]
        .map((e) => e.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "orders.csv");
  };

  const exportToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredOrders.map((order) => ({
        Name: order.user?.name || "Guest",
        Total: order.total,
        Status: order.status,
        OrderType: order.orderType,
        CreatedAt: new Date(order.createdAt).toLocaleString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders.xlsx");
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-purple-800">All Orders</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={exportToCSV}
            className="bg-purple-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-700"
          >
            Export CSV
          </button>
          <button
            onClick={exportToXLSX}
            className="bg-purple-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-700"
          >
            Export XLSX
          </button>
        </div>
      </div>

      {/* Combined Filters in a Single Row */}
      <div className="flex flex-wrap gap-10 mb-6">
        {/* Filter Controls */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 h-10 w-full text-sm rounded border border-purple-300 text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 h-10 w-full text-sm rounded border border-purple-300 text-gray-500"
              >
                <option className="text-gray-500">All</option>
                <option className="text-gray-500">Pending</option>
                <option className="text-gray-500">Preparing</option>
                <option className="text-gray-500">Ready</option>
                <option className="text-gray-500">Delivered</option>
                <option className="text-gray-500">Cancelled</option>
              </select>
            </div>

            {/* Start Date Picker */}
            <div className="relative">
              <CalendarDaysIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="pl-10 pr-3 py-2 h-10 w-full text-sm rounded border border-purple-300 text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* End Date Picker */}
            <div className="relative">
              <CalendarDaysIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || undefined}
                placeholderText="End Date"
                className="pl-10 pr-3 py-2 h-10 w-full text-sm rounded border border-purple-300 text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-purple-100 text-purple-800 text-sm">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Order Type</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td
                      className="p-3 text-purple-700 cursor-pointer"
                      onClick={() => router.push(`/admin/orders/${order._id}`)}
                    >
                      {order.user?.name || "Guest"}
                    </td>
                    <td className="p-3 text-gray-700">
                      ₹
                      {Number(
                        order.total ?? (order as any).totalAmount ?? 0
                      ).toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                          statusStyles[order.status] ||
                          "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">{order.orderType}</td>
                    <td className="p-3 text-gray-700">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/orders/${order._id}`)
                        }
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200"
                      >
                        View
                      </button>
                      <button
                        onClick={() => markAsDelivered(order._id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                      >
                        Mark as Delivered
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 text-lg text-purple-700 hover:bg-purple-100 rounded disabled:opacity-50"
            >
              &lt;
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-lg text-purple-700 hover:bg-purple-100 rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersTable;
