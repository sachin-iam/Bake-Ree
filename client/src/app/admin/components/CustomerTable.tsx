"use client";

import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import CustomerFormModal from "./CustomerFormModal";
import ConfirmDialog from "./ConfirmDialog";
import { toast } from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  createdAt: string;
}

export default function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // --- header checkbox ref for indeterminate state
  const headerCheckboxRef = useRef<HTMLInputElement | null>(null);

  const fetchCustomers = async () => {
    setLoading(true); // Start loading spinner

    try {
      const params = new URLSearchParams({
        search,
        status: statusFilter,
        startDate,
        endDate,
        page: String(page),
        limit: String(limit),
      });

      const res = await fetch(`http://localhost:5000/api/customers?${params}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const data = await res.json();
      setCustomers(data.customers || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, statusFilter, startDate, endDate, page]);

  // clear selection when the page/filters change
  useEffect(() => {
    setSelectedIds([]);
    setSelectAll(false);
  }, [search, statusFilter, startDate, endDate, page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Customer deleted");

      fetchCustomers(); // Refresh list
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleToggleStatus = async (id: string) => {
    await fetch(`/api/customers/${id}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchCustomers();
  };

  const handleBulkDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/customers`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Bulk delete failed");

      toast.success("Selected customers deleted");
      setSelectedIds([]);
      setSelectAll(false);
      setShowConfirm(false);
      fetchCustomers();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ["Name", "Email", "Phone", "Signup Date", "Status"],
      ...customers.map((c) => [
        c.name,
        c.email,
        c.phone || "",
        new Date(c.createdAt).toLocaleDateString(),
        c.isActive ? "Active" : "Inactive",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "customers.csv";
    link.click();
  };

  const handleExportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      customers.map((c) => ({
        Name: c.name,
        Email: c.email,
        Phone: c.phone || "",
        "Signup Date": new Date(c.createdAt).toLocaleDateString(),
        Status: c.isActive ? "Active" : "Inactive",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "customers.xlsx");
  };

  // per-row toggle
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // derived selection state for current page
  const pageIds = customers.map((c) => c._id);
  const allChecked =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
  const someChecked =
    pageIds.some((id) => selectedIds.includes(id)) && !allChecked;

  // update header checkbox indeterminate state
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someChecked;
    }
  }, [someChecked]);

  // header checkbox toggles only the current page rows
  const toggleSelectAllOnPage = () => {
    if (allChecked) {
      // unselect only this page
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
      setSelectAll(false);
    } else {
      // add this page
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
      setSelectAll(true);
    }
  };

  // existing function name retained
  const toggleSelectAll = () => {
    toggleSelectAllOnPage();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      {/* Header Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search name, email or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1.5 text-sm rounded-md placeholder-gray-400 text-gray-800"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-1.5 text-sm rounded-md text-gray-800"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-1.5 text-sm rounded-md text-gray-800"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-1.5 text-sm rounded-md text-gray-800"
          />
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 text-sm rounded-lg shadow-sm"
          >
            + Add
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-1.5 text-sm rounded-lg shadow-sm"
          >
            CSV
          </button>
          <button
            onClick={handleExportXLSX}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 text-sm rounded-lg shadow-sm"
          >
            XLSX
          </button>

          {/* Bulk Delete button (text) -> opens ConfirmDialog */}
          {selectedIds.length > 0 && (
            <button
              onClick={() => {
                setPendingDeleteId(null); // null => bulk mode
                setShowConfirm(true); // open dialog
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm rounded-lg shadow-sm"
              title="Delete selected"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 font-medium text-center">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleSelectAllOnPage}
                />
              </th>

              <th className="px-4 py-2 font-medium text-left">Name</th>
              <th className="px-4 py-2 font-medium text-left">Email</th>
              <th className="px-4 py-2 font-medium text-left">Phone</th>
              <th className="px-4 py-2 font-medium text-left">Signed Up</th>
              <th className="px-4 py-2 font-medium text-left">Status</th>
              <th className="px-4 py-2 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse border-t">
                  <td className="px-4 py-3">
                    <div className="h-4 w-4 bg-gray-300 rounded" />
                  </td>
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 w-full bg-gray-300 rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr
                  key={c._id}
                  className="border-t hover:bg-gray-50 transition-transform duration-200 ease-in-out hover:scale-[1.005]"
                >
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center justify-center h-[48px]">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedIds.includes(c._id)}
                        onChange={() => toggleSelect(c._id)}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle h-[48px]">{c.name}</td>
                  <td className="px-4 py-3 align-middle h-[48px]">{c.email}</td>
                  <td className="px-4 py-3 align-middle h-[48px]">
                    {c.phone || "—"}
                  </td>
                  <td className="px-4 py-3 align-middle h-[48px]">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-middle h-[48px]">
                    <span
                      onClick={() => handleToggleStatus(c._id)}
                      className={`px-2 py-1 text-xs rounded-md cursor-pointer font-semibold ${
                        c.isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      }`}
                    >
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3 align-middle h-[48px]">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditCustomer(c);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      {/* Row delete -> opens ConfirmDialog for single delete */}
                      <button
                        onClick={() => {
                          setPendingDeleteId(c._id);
                          setShowConfirm(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-800">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-full border border-gray-300 text-lg disabled:opacity-40"
          >
            &lt;
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-full border border-gray-300 text-lg disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modals */}
      <CustomerFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditCustomer(null);
        }}
        onSave={fetchCustomers}
        editCustomer={editCustomer}
      />

      <ConfirmDialog
        open={showConfirm}
        message={
          pendingDeleteId
            ? "Are you sure you want to delete this customer?"
            : "Are you sure you want to delete selected customers?"
        }
        onCancel={() => {
          setShowConfirm(false);
          setPendingDeleteId(null);
        }}
        onConfirm={async () => {
          try {
            if (pendingDeleteId) {
              await handleDelete(pendingDeleteId); // single
            } else {
              await handleBulkDelete(); // bulk
            }
          } finally {
            setShowConfirm(false);
            setPendingDeleteId(null);
          }
        }}
      />
    </div>
  );
}
